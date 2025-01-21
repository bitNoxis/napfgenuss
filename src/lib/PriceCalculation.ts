export var currentPeriod = 'Preis pro Tag';

export const LunaDayPrice = 1.25;
export const BaluDayPrice = 0.78;
export const OttoDayPrice = 0.89;
export const FieteDayPrice = 1.18;

const dogSizeConsumption = {
  Luna: 11,  // Hohe energetische Nahrung
  Balu: 8,  // im Wachstum
  Otto: 8, // Gelenkprobleme
  Fiete: 12,   // Senioren
};

export function PriceCalculation(price, period, dogName) {
  const monthlyConsumptionKg = dogSizeConsumption[dogName] || 5;
  switch (period) {
    case 'Preis pro Tag':
      return price;
    case 'Preis pro Monat':
      return (price * 30).toFixed(2);
    case 'Preis pro Kilogram':
      return ((price * 30) / monthlyConsumptionKg).toFixed(2);
    default:
      return price;
  }
}