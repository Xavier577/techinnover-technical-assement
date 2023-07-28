import { DroneModel, DroneState } from '@common/enums';
import PartialInstantiable from '@common/utils/partial-instantiable';

export class Drone extends PartialInstantiable<Drone> {
  id: string;
  serialNumber: string;
  model: DroneModel;
  batteryCapacity: number;
  weightLimit: number;
  state: DroneState;
}
