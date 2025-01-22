import type { DogData, PriceResult } from '../types/dog.types';

export class CalculationService {
  private static instance: CalculationService;

  private constructor() {}

  public static getInstance(): CalculationService {
    if (!CalculationService.instance) {
      CalculationService.instance = new CalculationService();
    }
    return CalculationService.instance;
  }

  public calculateDailyPrice(totalGrams: number, kibbleGrams: number, dogData: DogData): PriceResult {
    const basePrice = 0.35;

    // Größenfaktor
    let sizeFactor = 1.0;
    if (dogData.currentWeight <= 5) sizeFactor = 1.2;
    else if (dogData.currentWeight <= 10) sizeFactor = 1.1;
    else if (dogData.currentWeight <= 25) sizeFactor = 1.0;
    else if (dogData.currentWeight <= 45) sizeFactor = 0.9;
    else sizeFactor = 0.85;

    // Gesundheitsfaktor
    let healthFactor = 1.0;
    if (dogData.hasHealthIssues) {
      healthFactor += (dogData.healthIssues.length * 0.05);
    }

    // Alter-Faktor
    let ageFactor = 1.0;
    if (dogData.age.years <= 1) ageFactor = 1.15;
    else if (dogData.age.years >= 8) ageFactor = 1.1;

    let dailyPrice = (kibbleGrams / 100) * basePrice * sizeFactor * healthFactor * ageFactor;
    dailyPrice = Math.max(0.35, Math.min(3.0, dailyPrice));
    const monthlyPrice = dailyPrice * 30;

    return {
      daily: parseFloat(dailyPrice.toFixed(2)),
      monthly: parseFloat(monthlyPrice.toFixed(2))
    };
  }

  public computeDailyCalories(dogData: DogData): number {
    const base = 70 * Math.pow(dogData.currentWeight, 0.75);

    const activityFactors = {
      'very-low': 1.2,
      'low': 1.4,
      'medium': 1.6,
      'high': 1.8
    };

    const conditionFactors = {
      'very-underweight': 1.1,
      'underweight': 1.05,
      'ideal': 1.0,
      'overweight': 0.9,
      'obese': 0.85
    };

    const dailyCals = base * activityFactors[dogData.activityLevel] * conditionFactors[dogData.bodyCondition];
    return Math.round(dailyCals);
  }

  public getTreatsPercentage(treats: DogData['treats']): number {
    const treatPercentages = {
      'none': 0,
      'few-weekly': 5,
      'few-daily': 10,
      'many-daily': 20
    };
    return treatPercentages[treats];
  }

  public calsToGrams(dailyCals: number): number {
    return Math.round(dailyCals / 3.5);
  }
}
