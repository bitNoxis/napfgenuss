// types/kibble.ts
import type { WithId } from 'mongodb';

export type DogData = {
  gender: 'male' | 'female';
  name: string;
  isNeutered: boolean;
  age: {
    years: number;
    months: number;
  };
  breedType: 'purebred' | 'mixed' | 'unknown';
  breed?: string;
  breed2?: string;
  weight?: 'mini' | 'small' | 'medium' | 'large' | 'giant';
  currentWeight: number;
  bodyCondition: 'very-underweight' | 'underweight' | 'ideal' | 'overweight' | 'obese';
  activityLevel: 'very-low' | 'low' | 'medium' | 'high';
  treats: 'none' | 'few-weekly' | 'few-daily' | 'many-daily';
  hasHealthIssues: boolean;
  healthIssues: string[];
};

export type KibbleDocument = {
  Proteinquelle: string;
  Hypoallergen: string;
  Verdauungsförderung: number;
  Gelenkunterstützung: string;
  "Fell- und Hautgesundheit": number;
  Fettgehalt: number;
  Energiegehalt: number;
  Seniorenunterstützung: string;
  "Empfohlen für": string[];
  "Geeignet für": string[];
  "Ziel": string[];
};

export type Kibble = WithId<KibbleDocument> & {
  score?: number;
};
