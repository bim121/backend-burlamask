import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi'
import { DatabaseModule } from './database/database.module';
import { FilesModule } from './file/file.module';
import { InitialImageModule } from './initialImage/initialImage.module';
import { ChangedImageModule } from './changedImage/changedImage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
        RABBITMQ_USER: Joi.string().required(),
        RABBITMQ_PASSWORD: Joi.string().required(),
        RABBITMQ_HOST: Joi.string().required(),
        RABBITMQ_QUEUE_NAME: Joi.string().required(),
      })
    }),
    DatabaseModule,
    FilesModule,
    InitialImageModule,
    ChangedImageModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
