import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const allowedCrossOriginRoutes = ['http://localhost:4001/category',"http://localhost:4001/category/:id"];
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: function (req, callback) {
      let corsOption;
      if (allowedCrossOriginRoutes.indexOf(req.header('Origin')) !== -1) {
        corsOption = { cors: false };
      } else {
        corsOption = { cors: true };
      }
      return callback(null, corsOption);
    },
  });
  await app.listen(4001);
}
bootstrap();
