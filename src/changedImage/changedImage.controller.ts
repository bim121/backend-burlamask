import { getRepository } from 'typeorm';
import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateChangeImageDto } from "src/dto/changedImage-dto";
import { ChangedImageService } from "./changedImage.service";
import { ChangedImageEntity } from "src/entity/changedImage.entity";
import PublicFile from 'src/entity/publicImage.entity';
import { FindDto } from 'src/dto/find-dto';


@Controller('/changedImage')
export class ChangedImageController {
    constructor(private readonly changedImageServerice: ChangedImageService) { }

    @Post('/add')
    async addMap(@Body() dto: CreateChangeImageDto) {
       return await this.changedImageServerice.createChangedImage(dto);
    }

    @Get()
    async getPosts(@Query('search') search: string) {
    if (search) {
      return this.changedImageServerice.searchForChangedImage(search);
    }
    return this.changedImageServerice.getAll();
  }
    @Get(':id')
    async getOne(@Param('id') id: number){
        return this.changedImageServerice.getOne(id);
    }

    @Post('/username')
    async getByUsername(@Body() find: FindDto){
        return this.changedImageServerice.getByUsername(find);
    }
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.changedImageServerice.delete(id);
    }
}