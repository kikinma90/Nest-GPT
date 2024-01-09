import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
    );

  app.enableCors(); 

  // Utilizamos la libreria de bodyParser para permitir recibir archivos de mas de 5 mb, en este caso permitimos de 10mb
  app.use(bodyParser.json({limit: '10mb'}));
  app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

  await app.listen(3000);
}
bootstrap();
