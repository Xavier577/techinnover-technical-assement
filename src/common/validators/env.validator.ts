import * as Joi from 'joi';
import { AppEnv } from '@common/enums';

export default Joi.object({
  PORT: Joi.number().default(8000),
  NODE_ENV: Joi.string()
    .valid(AppEnv.DEVELOPMENT, AppEnv.TEST, AppEnv.STAGING, AppEnv.PRODUCTION)
    .default(AppEnv.DEVELOPMENT),

  DATABASE_URL: Joi.string().required(),

  SWAGGER_ROUTE: Joi.string().default('/api/docs'),
});
