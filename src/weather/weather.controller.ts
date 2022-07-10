import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { WeatherService } from "./weather.service";
import { IGetCities, IGetWeather } from "../interfaces/interfaces";

@Controller("api")
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {
  }

  @Get("get-city")
  async getCities(@Query("query") cityQuery: string): Promise<IGetCities[]> {
    return await this.weatherService.getCityByQuery(cityQuery);
  }

  @Get("favorites")
  async getFavorites(){
    return await this.weatherService.getAllFavorites()
  }

  @Get("get-weather")
  async getWeatherByCityKey(@Query() queryParams):Promise<IGetWeather>{
    const {cityKey,cityName}=queryParams
    return await this.weatherService.getWeatherByCityKey(cityKey,cityName)
  }

  @Post("favorite-city")
  async saveCityToFavorites(@Body() body){
    const {cityKey,weatherText,temperature}=body
    return await this.weatherService.saveToFavorites(cityKey,weatherText,temperature)
  }

  @Post("unfavorite-city")
  async deleteFromFavorites(@Body() body){
    return await this.weatherService.removeFromFavorites(body.cityKey)
  }


}
