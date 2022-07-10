import { NestFactory } from '@nestjs/core';
import { GlobalModule } from './global.module';

async function bootstrap() {
  const app = await NestFactory.create(GlobalModule);

  const cors_origins: string[] =["http://localhost:3000","https://weather-app-tal.herokuapp.com"]


  app.enableCors({
    origin:
      (origin, callback) => {
        if (!origin || cors_origins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS :( '));
        }
      },


    credentials: true,
  });


  await app.listen(process.env.PORT || '3030');
}
bootstrap();
