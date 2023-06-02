import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesModule } from "src/file/file.module";
import { ClientsModule, Transport } from "@nestjs/microservices";
import PublicFile from "src/entity/publicImage.entity";
import { ChangedImageEntity } from "src/entity/changedImage.entity";
import { HttpModule } from "@nestjs/axios";
import { ChangedImageController } from "./changedImage.controller";
import { ChangedImageService } from "./changedImage.service";
import ChangedImageSearchService from "./changedImageSearch.service";
import { SearchModule } from "src/search/search.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([ChangedImageEntity, PublicFile]),
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
        HttpModule,
        SearchModule
    ],
    controllers: [ChangedImageController],
    providers: [ChangedImageService, ChangedImageSearchService],
    exports: [ChangedImageService,  ChangedImageSearchService]
})
export class ChangedImageModule{
    
}