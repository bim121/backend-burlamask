import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert} from 'typeorm';
import * as bcrypt from 'bcrypt';
import Role from '../enum/role.enum';

@Entity('user')
export class UserEntity {  
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;
    @Column({ 
        type: 'varchar',  
        unique: true 
    }) 
    username: string;
    @Column({ 
        type: 'varchar', 
    }) 
    password: string;  
    @Column({ 
        type: 'varchar', 
    }) 
    email: string;
    @Column({
      type: 'enum',
      enum: Role,
      default: [Role.User]
    })
    public roles: Role[]
    
    @BeforeInsert()  async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }
}