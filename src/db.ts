import { DataSource } from "typeorm"
import dotenv from "dotenv"
dotenv.config()

export const myDataBase = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: "admin",
    password: process.env.DATABASE_PASSWORD,
    database: "flickfeed1", // db 이름
    entities: ["src/entity/*.ts"], // 모델의 경로
    logging: true, // 정확히 어떤 sql 쿼리가 실행됐는지 로그 출력
    synchronize: true,
})