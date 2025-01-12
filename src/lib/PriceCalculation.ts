export var currentPeriod = 'Preis pro Tag';

export const LunaDayPrice = 1.25;
export const BaluDayPrice = 1.05;
export const OttoDayPrice = 0.74;
export const FieteDayPrice = 1.18;

const dogSizeConsumption = {
  Luna: 7,  // Hohe energetische Nahrung
  Balu: 6,  // im Wachstum
  Otto: 7, // Gelenkprobleme
  Fiete: 4,   // Senioren
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