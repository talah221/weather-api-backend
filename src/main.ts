import { NestFactory } from '@nestjs/core';
import { GlobalModule } from './global.module';

async function bootstrap() {
  const app = await NestFactory.create(GlobalModule);
  app.enableCors({origin:["http://localhost:3000","https://weather-app-tal.herokuapp.com/"]})
  await app.listen(process.env.PORT || '3030');
}
bootstrap();
