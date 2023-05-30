import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

 
config();
 
const configService = new ConfigService();
 
export default new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ["src/entity/*.entity.ts"],
    synchronize: true,
    migrationsTableName: 'custom_migration_table',
    migrations: ["src/migrations/*.ts"],
});