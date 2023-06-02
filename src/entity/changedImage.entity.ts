import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne} from 'typeorm';
import PublicFile from './publicImage.entity';

@Entity('changedImage')
export class ChangedImageEntity {  
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;
    @Column({ 
        type: 'varchar',  
        unique: true 
    }) 
    description: string;
    @JoinColumn()
    @OneToOne(
    () => PublicFile,
    {
      eager: true,
    })
    public image?: PublicFile;
}