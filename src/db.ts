import { DataSource } from "typeorm"
import dotenv from "dotenv"
dotenv.config()

export const myDataBase = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: "admin",
    password: process.env.DATABASE_PASSWORD,
    database: "flickfeed", 
    entities: ["src/entity/*.ts"],
    logging: true,
    synchronize: true,
})