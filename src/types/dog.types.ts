export interface DogData {
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
  weight?: string;
  currentWeight: number;
  bodyCondition: 'very-underweight' | 'underweight' | 'ideal' | 'overweight' | 'obese';
  activityLevel: 'very-low' | 'low' | 'medium' | 'high';
  treats: 'none' | 'few-weekly' | 'few-daily' | 'many-daily';
  hasHealthIssues: boolean;
  healthIssues: string[];
  otherHealthDescription?: string;
}

export interface PriceResult {
  daily: number;
  monthly: number;
}

export interface DogBreed {
  _id?: string;
  name: string;
  nameDE: string;
  image: {
    id: string;
    width: number;
    height: number;
    url: string;
  };
  weight: {
    imperial: string;
    metric: string;
  };
  life_span: string;
  // Weitere Felder können hier ergänzt werden, falls benötigt
}
