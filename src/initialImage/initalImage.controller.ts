import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { InitialImageService } from "./initialImage.service";
import { CreateInitialImageDto } from "src/dto/initialImage-dto";
import { InitialImageEntity } from "src/entity/initalImage.entity";
import { getRepository } from "typeorm";
import PublicFile from "src/entity/publicImage.entity";

@Controller('/initialImage')
export class InitialImageController {
    constructor(private readonly initialImageServerice: InitialImageService) { }

    @Post('/add')
    @UseInterceptors(FileInterceptor('file'))
    async addMap(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateInitialImageDto) {
       return await this.initialImageServerice.createInitialImage(dto, file.buffer, file.originalname);
    }

    @Get()
    async getAll(){
        return this.initialImageServerice.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: number){
        return this.initialImageServerice.getOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.initialImageServerice.delete(id);
    }
}