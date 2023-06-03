import { Injectable } from '@nestjs/common';
import { AuthService} from '../Auth/auth.service';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import MessageEntity from 'src/entity/message.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entity/user.entity';
 
@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(MessageEntity)
    private messagesRepository: Repository<MessageEntity>,
  ) {
  }
 
  async saveMessage(content: string) {
    const newMessage = await this.messagesRepository.create({
      content,
    });
    await this.messagesRepository.save(newMessage);
  }
}