import { Injectable, HttpException, HttpStatus, ForbiddenException, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { map, catchError, lastValueFrom } from 'rxjs';
import { ClientProxy } from "@nestjs/microservices";
import { InitialImageEntity } from "src/entity/initalImage.entity";
import { CreateInitialImageDto } from "src/dto/initialImage-dto";

@Injectable()
export class InitialImageService {
    constructor(
        @InjectRepository(InitialImageEntity)    
        private readonly initialImageRepo: Repository<InitialImageEntity>,
        @Inject('FILES_SERVICE') private filesService: ClientProxy ) {}

    async createInitialImage(initialImageDto: CreateInitialImageDto, imageBuffer: Buffer, filename: string): Promise<InitialImageEntity> {    
        const {  description } = initialImageDto;

        const initialImageObject: InitialImageEntity = await this.initialImageRepo.create({ description });
        await this.initialImageRepo.save(initialImageObject);

        const json = JSON.stringify({
            buffer: imageBuffer.toString('base64')
          });

        const image = await this.filesService.send({
            cmd: 'upload-files'
          }, {json, filename}).toPromise();

        if(!image){
            throw new HttpException('Bad exception for rabbitmq', HttpStatus.BAD_REQUEST); 
        } 

        console.log(image.url);

        await this.initialImageRepo.update(initialImageObject, {
            ...map,
            image
        });
        await this.initialImageRepo.save(initialImageObject);

        return initialImageObject;  
    }

    async getAll(): Promise<InitialImageEntity[]> {
        return this.initialImageRepo.find();
    }

    async getOne(id: number): Promise<InitialImageEntity> {
        return this.initialImageRepo.findOneBy({ id });
    }

    async delete(id: number): Promise<void> {
        this.initialImageRepo.delete({ id });
    }
}