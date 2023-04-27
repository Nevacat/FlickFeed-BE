import { DataSource } from "typeorm"
import dotenv from 'dotenv'
dotenv.config()

export const myDataBase = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOSTNAME,
    port: 3306,
    username: "admin",
    password: process.env.DATABASE_PASSWORD,
    database: "flickfeed1", 
    entities: [process.env.NODE_ENV === 'production' ? 'dist/entity/*.js' : 'src/entity/*.ts'],
    logging: true,
    synchronize: true,
})