import { Injectable, Logger } from "@nestjs/common";
import { IGetCities, IGetWeather } from "./interfaces/interfaces";
import { GET_CITIES_URL, GET_WEATHER_URL } from "./consts/consts";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly httpService: HttpService) {
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

  async getWeatherByCityKey(cityKey: string): Promise<IGetWeather> {
    try {
      const weatherInDB = await this._getWeatherByCityInDB(cityKey);
      if (weatherInDB) return weatherInDB;
      const { weatherText, temperature } = await this._getWeatherByCityAPI(cityKey);

      await this._saveWeatherInDB({ cityKey, weatherText, temperature });
      return { weatherText, temperature };

    } catch (err) {
      this.logger.error(`Got Error Fetching Error for city: ${cityKey}, err is: ${err}`);
    }
  }

  async getAllFavorites() {
    return Promise.resolve([{ name: "Test", key: "123456" }]); // mock for now
  }

  async saveToFavorites(cityKey, cityName) {

  }

  async deleteFavorites(cityKey) {
  }

  private async _getWeatherByCityInDB(cityKey): Promise<any> {
    return Promise.resolve(null);
  }

  private async _getWeatherByCityAPI(cityKey): Promise<IGetWeather> {
    const getWeatherURL = GET_WEATHER_URL(cityKey);
    const response = await (this.httpService.get(`${getWeatherURL}`).toPromise());
    const { WeatherText: weatherText, Temperature } = response.data[0];
    return { weatherText, temperature: Temperature.Metric.Value };

  }

  private async _saveWeatherInDB({ cityKey, weatherText, temperature }) {
  }


}
