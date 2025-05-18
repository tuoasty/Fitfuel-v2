/* eslint-disable prettier/prettier */
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        transform:true
    }));
    app.use(cookieParser());
    app.enableCors({
        origin: [
            "https://localhost:5173",
            "http://localhost:5173",
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
