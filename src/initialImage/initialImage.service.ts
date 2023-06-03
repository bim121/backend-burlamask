import { Injectable, HttpException, HttpStatus, ForbiddenException, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { map, catchError, lastValueFrom } from 'rxjs';
import { ClientProxy } from "@nestjs/microservices";
import { InitialImageEntity } from "src/entity/initalImage.entity";
import { CreateInitialImageDto } from "src/dto/initialImage-dto";
import { FindDto } from "src/dto/find-dto";

@Injectable()
export class InitialImageService {
    constructor(
        @InjectRepository(InitialImageEntity)    
        private readonly initialImageRepo: Repository<InitialImageEntity>,
        @Inject('FILES_SERVICE') private filesService: ClientProxy ) {}

    async createInitialImage(initialImageDto: CreateInitialImageDto, imageBuffer: Buffer, filename: string): Promise<InitialImageEntity> {    
        const {  description, username } = initialImageDto;
        
        const initialImageObject: InitialImageEntity = await this.initialImageRepo.create({ description, username });
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
            ...initialImageObject,
            image
        });
        await this.initialImageRepo.save(initialImageObject);

        return await this.initialImageRepo.findOne({
            where: {
                id: initialImageObject.id
            },
            relations: {
                image: true,
            },
        }) 
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

    async getByUsername(find: FindDto) {
        return await this.initialImageRepo.find({
            where: {
                username: find.username
            },
            relations: {
                image: true,
            },
        }) 
    }
}