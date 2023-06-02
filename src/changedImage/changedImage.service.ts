import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ClientProxy } from "@nestjs/microservices";
import { ChangedImageEntity } from "src/entity/changedImage.entity";
import { HttpService } from '@nestjs/axios';
import { CreateChangeImageDto } from '../dto/changedImage-dto';
import ChangedImageSearchService from "./changedImageSearch.service";

@Injectable()
export class ChangedImageService {
    constructor(
        @InjectRepository(ChangedImageEntity)    
        private readonly changedImageRepo: Repository<ChangedImageEntity>,
        @Inject('FILES_SERVICE') private filesService: ClientProxy,
        private readonly httpService: HttpService,
        private changedImageSearchService: ChangedImageSearchService ) {}

    async createChangedImage(dto: CreateChangeImageDto) {  
        const {descriptionOne, descriptionTwo, faceUrl, bodyUrl} = dto;  
        const requestBody = { face_url: faceUrl, body_url: bodyUrl };
        const firstChangedImageObject: ChangedImageEntity = await this.changedImageRepo.create({ description: descriptionOne });
        await this.changedImageRepo.save(firstChangedImageObject);
        this.changedImageSearchService.indexPost(firstChangedImageObject);
        const secondChangedImageObject: ChangedImageEntity = await this.changedImageRepo.create({ description: descriptionTwo });
        await this.changedImageRepo.save(secondChangedImageObject);
        this.changedImageSearchService.indexPost(secondChangedImageObject);

        const arr: ChangedImageEntity[] = [];

        const response = await this.httpService.post('http://flask:5000/process_images', requestBody).toPromise();

        let json = JSON.stringify({
            buffer: response.data.face_image_data
          });

        const filename = "dsfgfd.jpg";
        
        let image = await this.filesService.send({
            cmd: 'upload-files'
          }, {json, filename}).toPromise();

        

        if(!image){
            throw new HttpException('Bad exception for rabbitmq', HttpStatus.BAD_REQUEST); 
        } 

        await this.changedImageRepo.update(firstChangedImageObject, {
            ...firstChangedImageObject,
            image
        });
        await this.changedImageRepo.save(firstChangedImageObject);

        let object = await this.changedImageRepo.findOne({
            where: {
                id: firstChangedImageObject.id
            },
            relations: {
                image: true,
            },
        }) 

        arr.push(object);

        json = JSON.stringify({
            buffer: response.data.body_image_data
        });

        image = await this.filesService.send({
            cmd: 'upload-files'
        }, {json, filename}).toPromise();

        if(!image){
            throw new HttpException('Bad exception for rabbitmq', HttpStatus.BAD_REQUEST); 
        } 

        await this.changedImageRepo.update(secondChangedImageObject, {
            ...secondChangedImageObject,
            image
        });

        await this.changedImageRepo.save(secondChangedImageObject);

        object = await this.changedImageRepo.findOne({
            where: {
                id: secondChangedImageObject.id
            },
            relations: {
                image: true,
            },
        }) 

        arr.push(object);

        return arr;
    }

    async searchForChangedImage(description: string) {
        const results = await this.changedImageSearchService.search(description);
        const ids = results.map(result => result.id);
        if (!ids.length) {
            return [];
        }
        return this.changedImageRepo.find({
            where: { id: In(ids) }
        });
    }

    async getAll(): Promise<ChangedImageEntity[]> {
        return this.changedImageRepo.find();
    }

    async getOne(id: number): Promise<ChangedImageEntity> {
        return this.changedImageRepo.findOneBy({ id });
    }

    async delete(id: number): Promise<void> {
        this.changedImageRepo.delete({ id });
    }
}