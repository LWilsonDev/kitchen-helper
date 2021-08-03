export type conversionType = {
  id: number;
  rate: number;
};

export type unitType = {
  id: number;
  label: string;
  symbol: string;
  conversions: conversionType[];
};

export const units: unitType[] = [
  {
    id: 1,
    label: "Grams",
    symbol: "g",
    conversions: [
      {id: 2, rate: 0.035274},
      {id: 3, rate: 0.00423},
    ],
  },
  {
    id: 2,
    label: "Ounces",
    symbol: "oz",
    conversions: [
      {id: 1, rate: 28.3495},
      {id: 3, rate: 0.120095},
    ],
  },
  {
    id: 3,
    label: "Cups",
    symbol: "cups",
    conversions: [
      {id: 1, rate: 128},
      {id: 2, rate: 8.32674},
    ],
  },
];
