import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
 
@Entity()
class MessageEntity {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public content: string;
}
 
export default MessageEntity;