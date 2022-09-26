import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
const allowedCrossOriginRoutes = [
  'http://localhost:4001/category',
  'http://localhost:4001/category/:id',
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: function (req, callback) {
      let corsOption;
      corsOption = { cors: true };
      if (allowedCrossOriginRoutes.indexOf(req.header('Origin')) !== -1) {
        // corsOption = { cors: false };
      } else {
        // corsOption = { cors: true };
      }
      return callback(null, corsOption);
    },
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.enableCors({
  //   credentials: true,
  //   origin: 'http://localhost',
  // });
  await app.listen(4001);
}
bootstrap();
