import { Module } from '@nestjs/common';
import { WeatherController } from './weather/weather.controller';
import { HttpModule } from "@nestjs/axios";
import { WeatherService } from "./weather/weather.service";
import { MongooseModule } from "@nestjs/mongoose";
import { MONGO_URI } from "./consts/consts";
import { WeatherModule } from './weather/weather.module';


@Module({
  imports: [HttpModule,MongooseModule.forRoot(MONGO_URI), WeatherModule],
  controllers: [],
  providers: [],
})
export class GlobalModule {}
