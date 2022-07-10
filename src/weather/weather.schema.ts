import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IGetWeather } from "../interfaces/interfaces";

export type WeatherDocument = Weather & Document;

@Schema()
export class Weather implements IGetWeather {

  @Prop({ isRequired: true,unique:true })
  cityKey: number;

  @Prop()
  name:string

  @Prop({ isRequired: true })
  temperature: number;

  @Prop({ isRequired: true })
  weatherText: string;

  @Prop({default:false})
  isFavorite:boolean




}

export const WeatherSchema = SchemaFactory.createForClass(Weather);