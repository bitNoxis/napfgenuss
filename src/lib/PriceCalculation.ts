export var currentPeriod = 'Preis pro Tag';
export const LunaDayPrice = 1.21;
export const BaluDayPrice = 0.78;
export const OttoDayPrice = 0.89;
export const FieteDayPrice = 1.18;

const dogSizeConsumptionArray = [
  { name: "Luna", consumption: 5 }, // Hohe energetische Nahrung
  { name: "Balu", consumption: 5 }, // im Wachstum
  { name: "Otto", consumption: 5 }, // Gelenkprobleme
  { name: "Fiete", consumption: 5 }, // Senioren
];

export function PriceCalculation(price, period, dogName) {
  // Find the dog object in the array by name
  const dog = dogSizeConsumptionArray.find(d => d.name === dogName);
  console.log(dog)

  // Use nullish coalescing to provide a default consumption if dog is not found
  const monthlyConsumptionKg = dog?.consumption;

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