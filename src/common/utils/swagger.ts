import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppEnv } from '@common/enums';

export default function Swagger(
  app: INestApplication,
  // eslint-disable-next-line @typescript-eslint/ban-types
  modules?: Function[],
) {
  const configService = app.get(ConfigService);

  const NODE_ENV = configService.get<string>('NODE_ENV');

  const swaggerRoute = configService.get<string>('SWAGGER_ROUTE');

  if (NODE_ENV === AppEnv.PRODUCTION) return;

  const config = new DocumentBuilder()
    .setTitle('Drones Dispatcher')
    .setDescription('API documentation Drone Dispatcher')
    .setVersion('1.0')
    .addTag('Api')
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Drone Dispatcher API',
    useGlobalPrefix: false,
  };

  const document = SwaggerModule.createDocument(app, config, {
    include: modules,
  });

  SwaggerModule.setup(swaggerRoute, app, document, customOptions);
}
