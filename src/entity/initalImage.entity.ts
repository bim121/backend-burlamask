import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('initialImage')
export class InitialImageEntity {  
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;
    @Column({ 
        type: 'varchar',  
        unique: true 
    }) 
    descriptions: string;
}