import { Injectable, Logger } from "@nestjs/common";
import { IGetCities, IGetWeather } from "../interfaces/interfaces";
import { GET_CITIES_URL, GET_WEATHER_URL } from "../consts/consts";
import { HttpService } from "@nestjs/axios";
import { InjectModel } from "@nestjs/mongoose";
import { Weather, WeatherDocument } from "./weather.schema";
import { Model } from "mongoose";

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Weather.name) private weatherModel: Model<WeatherDocument>
  ) {
  }

  async getCityByQuery(query): Promise<IGetCities[]> {

    try {
      const response = await (this.httpService.get(`${GET_CITIES_URL}${query}`).toPromise());
      return response.data.map(city => (
        {
          name: `${city.LocalizedName}, ${city.Country.LocalizedName}`,
          key: city.Key
        }));
    } catch (err) {
      this.logger.error(`Got error Fetching Cities for query: ${query}. err: ${err}`);

    }
  }

  async getWeatherByCityKey(cityKey: string,cityName:string): Promise<IGetWeather> {
    try {
      const weatherInDB = await this._getWeatherByCityInDB(cityKey);
      if (weatherInDB) return weatherInDB;
      const { weatherText, temperature } = await this._getWeatherByCityAPI(cityKey);

      await this._saveWeatherInDB({ cityKey, weatherText, temperature, isFavorites: false,name:cityName });
      return { weatherText, temperature };

    } catch (err) {
      this.logger.error(`Got Error Fetching Error for city: ${cityKey}, err is: ${err}`);
    }
  }

  async getAllFavorites() {
    try {
      return await this.weatherModel.find({ isFavorite: true }).lean().exec();
    } catch (err) {
      this.logger.error(`Got Error Finding ALL favorites, err is: ${err}`);
    }
  }

  async saveToFavorites(cityKey: number, weatherText: string, temperature: number) {
    try {
      await this.weatherModel.updateOne<Weather>(
        { cityKey },
        { cityKey, weatherText, temperature, isFavorite: true },
        { upsert: true }); // if no weather document found, will create new one

    } catch (err) {
      this.logger.error(`Got error Saving to favorites, err is : ${err}`);
    }

  }

  async removeFromFavorites(cityKey) {
    try{
    await this.weatherModel.updateOne({ cityKey }, { $set: { isFavorite: false } });

    }catch(err){
      this.logger.error(`Got Error Removing for favorites, err is: ${err}`)
    }
  }

  private async _getWeatherByCityInDB(cityKey): Promise<IGetWeather> {
    const weather:Weather = await this.weatherModel.findOne({ cityKey }).lean().exec();
    if (!weather) return null;
    const { weatherText, temperature,isFavorite } = weather;
    return { weatherText, temperature,isFavorite };
  }

  private async _getWeatherByCityAPI(cityKey): Promise<IGetWeather> {
    const getWeatherURL = GET_WEATHER_URL(cityKey);
    try{
    const response = await (this.httpService.get(getWeatherURL).toPromise());
    const { WeatherText: weatherText, Temperature } = response.data[0];
    return { weatherText, temperature: Temperature.Metric.Value };
    }catch(err){
      this.logger.error(`Got Error FETCHING from api, err is: ${err}`)

    }

  }

  private async _saveWeatherInDB(newWeather) {
    try {
      await this.weatherModel.create(newWeather);
    } catch (err) {
      this.logger.error(`Unable to create WEATHER, err is: ${err}`);
    }
  }


}
