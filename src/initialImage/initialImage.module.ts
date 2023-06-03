import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesModule } from "src/file/file.module";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { InitialImageEntity } from "src/entity/initalImage.entity";
import PublicFile from "src/entity/publicImage.entity";
import { InitialImageController } from "./initalImage.controller";
import { InitialImageService } from "./initialImage.service";
import { ChatModule } from "src/Gateway/chat.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([InitialImageEntity, PublicFile]),
        FilesModule,
        ClientsModule.register([
            {
              name: 'FILES_SERVICE',
              transport: Transport.RMQ,
              options: {
                urls: [`amqp://guest:guest@rabbitmq:5672`],
                queue: 'files',
                queueOptions: {
                    durable: true,
                },
              },
            },
          ]),
          ChatModule
    ],
    controllers: [InitialImageController],
    providers: [InitialImageService],
    exports: [InitialImageService]
})
export class InitialImageModule{
    
}