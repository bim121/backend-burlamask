import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import MessageEntity from 'src/entity/message.entity';
import { AuthModule } from 'src/Auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [ChatGateway, ChatService],
  exports: [ChatGateway, ChatService]
})
export class ChatModule {}