import { Module } from "@nestjs/common";
import { WeatherController } from "./weather.controller";
import { WeatherService } from "./weather.service";
import { HttpModule } from "@nestjs/axios";
import { MongooseModule } from "@nestjs/mongoose";
import { Weather, WeatherSchema } from "./weather.schema";

@Module({
  imports:[HttpModule,MongooseModule.forFeature([{name:Weather.name,schema:WeatherSchema}])],
  controllers: [WeatherController],
  providers: [WeatherService]
})
export class WeatherModule {
}
