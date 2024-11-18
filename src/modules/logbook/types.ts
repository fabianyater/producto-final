import { Document, Types } from "mongoose";

export type Coordinates = {
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
};

export type WeatherConditions = {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherType: string;
  samplingTime: Date;
};

export type HabitatDescription = {
  vegetationType: string;
  altitude: number;
  soilType?: string;
  climate?: string;
  notes?: string;
};

export type SamplingSiteImage = {
  url: string;
  description?: string;
  takenAt: Date;
  photographer?: string;
};

export type CollectedSpecies = {
  scientificName?: string;
  commonName: string;
  family?: string;
  sampleQuantity: number;
  plantStatus: string;
  photos: string[];
};

export interface ILogBook extends Document {
  id: string;
  title: string;
  date: Date;
  location: Coordinates;
  weather: WeatherConditions;
  habitat: HabitatDescription;
  images?: SamplingSiteImage[];
  collectedSpecies: CollectedSpecies[];
  additionalObservations: string;
  createdBy: Types.ObjectId;
}

export interface RegisterRequestBody {
  title: string;
  date: Date;
  location: Coordinates;
  weather: WeatherConditions;
  habitat: HabitatDescription;
  images: SamplingSiteImage[];
  collectedSpecies: CollectedSpecies[];
  additionalObservations: string;
  createdBy: Types.ObjectId;
}
