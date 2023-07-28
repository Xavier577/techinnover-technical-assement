import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  BadRequestException,
  Logger,
  Query,
} from '@nestjs/common';
import { DronesService } from './services/drones.service';
import { RegisterDroneDto } from '@drones/dtos/register-drone.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Drone } from '@drones/entities/drone.entity';
import { DroneIdDto } from '@drones/dtos/drone-id.dto';
import { MedicationsService } from '@medications/services/medications.service';
import { LoadDroneDto } from '@drones/dtos/load-drone.dto';
import { DroneState } from '@common/enums';
import { SerialNumberDto } from '@drones/dtos/serial-number.dto';
import { DroneStateResponseDto } from '@drones/dtos/drone-state-response.dto';
import { DroneBatteryLevelResponseDto } from '@drones/dtos/drone-battery-level-response.dto';
import { DroneDto } from '@drones/dtos/drone.dto';

@ApiTags('Drones')
@Controller('drones')
export class DronesController {
  constructor(
    private readonly dronesService: DronesService,
    private readonly medicationsService: MedicationsService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register drones',
    description:
      'Register drones in the system (for each registered drone a serial number is generated)',
  })
  @ApiResponse({ status: 200, type: DroneDto })
  public async registerDrone(
    @Body() payload: RegisterDroneDto,
  ): Promise<Drone> {
    return this.dronesService.createDrone(payload);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all registered drones (utility endpoint)' })
  @ApiResponse({ status: 200, type: DroneDto, isArray: true })
  public async getAllDrones(): Promise<Drone[]> {
    return this.dronesService.getAllDrones();
  }

  @Get('available')
  @ApiOperation({
    summary: 'Get all available drones ',
    description:
      'Get drones with more than 25% battery life and a state of IDLE or LOADING',
  })
  @ApiResponse({ status: 200, type: DroneDto, isArray: true })
  public async getAvailableDrones(): Promise<Drone[]> {
    return this.dronesService.getAvailableDrones();
  }

  @Get('battery-level/:id')
  @ApiOperation({ summary: 'Get Drone battery level' })
  @ApiResponse({ status: 200, type: DroneBatteryLevelResponseDto })
  public async getDroneBatteryLevel(
    @Param() { id }: DroneIdDto,
  ): Promise<DroneBatteryLevelResponseDto> {
    const batteryLevel = await this.dronesService.getDroneBatteryCapacity(id);

    if (batteryLevel == null) {
      throw new BadRequestException('Invalid drone id');
    }

    return { batteryLevel };
  }

  @Get('state/:id')
  @ApiOperation({ summary: 'Get drone state' })
  @ApiResponse({ status: 200, type: DroneStateResponseDto })
  public async getDroneState(
    @Param() { id }: DroneIdDto,
  ): Promise<DroneStateResponseDto> {
    const droneState = await this.dronesService.getDroneState(id);

    if (droneState == null) {
      throw new BadRequestException('Invalid drone id');
    }

    return { state: droneState };
  }

  @Get('load/:id')
  @ApiOperation({ summary: 'Get all medication item loaded on drone' })
  public async getMedsLoadedOnDrone(@Param() { id }: DroneIdDto) {
    const drone = await this.dronesService.getDroneById(id);

    if (drone == null) {
      throw new BadRequestException('Invalid drone id');
    }

    const loads = await this.medicationsService.getMedsLoadOnDrone(drone.id);

    return {
      ...drone,
      medsLoadedOnDrone: loads,
    };
  }

  @Post('load/:id')
  @ApiOperation({ summary: 'Load Medication item on drone' })
  public async loadMedsOnDrone(
    @Param() { id }: DroneIdDto,
    @Body() payload: LoadDroneDto,
  ) {
    const drone = await this.dronesService.getDroneById(id);

    if (drone == null) {
      throw new BadRequestException('Invalid drone id');
    }

    const DRONE_IS_NOT_AVAILABLE =
      drone.state !== DroneState.IDLE && drone.state !== DroneState.LOADING;

    if (DRONE_IS_NOT_AVAILABLE) {
      throw new BadRequestException('Drone is currently not available');
    }

    const BATTERY_BELOW_OPTIMAL_LVL = drone.batteryCapacity < 26;

    if (BATTERY_BELOW_OPTIMAL_LVL) {
      throw new BadRequestException('Drone battery level is low (25%)');
    }

    const totalWeightOfLoad = payload.items.reduce((total, curr) => {
      total += curr.weight;
      return total;
    }, 0);

    const medWeightLoadedOnDrone =
      await this.medicationsService.getMedWeightLoadedOnDrone(drone.id);

    const WEIGHT_LIMIT_REACHED = drone.weightLimit <= medWeightLoadedOnDrone;

    if (WEIGHT_LIMIT_REACHED) {
      throw new BadRequestException(
        `Cannot load drone with items because it has reached it weight limit (${drone.weightLimit})`,
      );
    }

    const WEIGHT_LIMIT_WOULD_BE_EXCEEDED =
      drone.weightLimit < medWeightLoadedOnDrone + totalWeightOfLoad;

    if (WEIGHT_LIMIT_WOULD_BE_EXCEEDED) {
      throw new BadRequestException(
        `Cannot load drone with items because it will exceed it weight limit (${drone.weightLimit})`,
      );
    }

    await this.medicationsService.loadMedsOnDrone(drone.id, payload.items);

    return { id: drone.id, message: 'drone successfully loaded' };
  }

  @Get('drone')
  @ApiOperation({ summary: 'Get Drone with SerialNumber' })
  public async getDroneWithSerialNumber(
    @Query() { serialNumber }: SerialNumberDto,
  ) {
    const drone = await this.dronesService.getDroneBySerialNumber(serialNumber);

    if (drone == null) {
      throw new BadRequestException('Invalid Serial Number');
    }

    return drone;
  }

  @Get('drone/:id')
  @ApiOperation({ summary: 'Get Drone with Id' })
  public async getDroneWithId(@Query() { id }: DroneIdDto) {
    const drone = await this.dronesService.getDroneById(id);

    if (drone == null) {
      throw new BadRequestException('Invalid Id');
    }

    return drone;
  }
}
