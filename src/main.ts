import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS configuration
  app.enableCors({
    origin: 'http://localhost:4200', // Specify the allowed origin or use '*' for all
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Optional: Specify the allowed HTTP methods
    allowedHeaders: 'Content-Type, Accept', // Optional: Specify the allowed headers
  });
  
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:4200', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    allowedHeaders: 'Content-Type, Accept',
  });
  await app.listen(3000);
}
bootstrap();
