import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateChangeImageDto } from "src/dto/changedImage-dto";
import { ChangedImageService } from "./changedImage.service";


@Controller('/changedImage')
export class ChangedImageController {
    constructor(private readonly changedImageServerice: ChangedImageService) { }

    @Post('/add')
    async addMap(@Body() dto: CreateChangeImageDto) {
       return await this.changedImageServerice.createChangedImage(dto);
    }

    @Get()
    async getAll(){
        return this.changedImageServerice.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: number){
        return this.changedImageServerice.getOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.changedImageServerice.delete(id);
    }
}