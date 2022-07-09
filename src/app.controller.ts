import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { AppService } from "./app.service";
import { IGetCities, IGetWeather } from "./interfaces/interfaces";

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get("get-city")
  async getCities(@Query("query") cityQuery: string): Promise<IGetCities[]> {
    return await this.appService.getCityByQuery(cityQuery);
  }

  @Get("favorites")
  async getFavorites(){
    return await this.appService.getAllFavorites()
  }

  @Get("get-weather")
  async getWeatherByCityKey(@Query("cityKey") cityKey:string):Promise<IGetWeather>{
    return await this.appService.getWeatherByCityKey(cityKey)
  }

  @Post("favorite-city")
  async saveCityToFavorites(@Body() body){
    return await this.appService.saveToFavorites(body.cityKey,body.cityName)
  }

  @Delete("delete-city")
  async deleteFromFavorites(@Body() body){
    return await this.appService.deleteFavorites(body.cityKey)
  }


}
