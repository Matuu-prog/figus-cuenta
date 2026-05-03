export interface Country {
  code: string;
  name: string;
  group: string;
  pages: [number, number, number, number];
}

export const countries: Country[] = [
  { code: 'MEX', name: 'Mexico', group: 'A', pages: [8, 10, 12, 14] },
  { code: 'RSA', name: 'South Africa', group: 'A', pages: [8, 10, 12, 14] },
  { code: 'KOR', name: 'Korea Republic', group: 'A', pages: [12, 14, 16, 18] },
  { code: 'CZE', name: 'Czechia', group: 'A', pages: [12, 14, 16, 18] },
  { code: 'CAN', name: 'Canada', group: 'B', pages: [16, 18, 20, 22] },
  { code: 'BIH', name: 'Bosnia-Herzegovina', group: 'B', pages: [16, 18, 20, 22] },
  { code: 'QAT', name: 'Qatar', group: 'B', pages: [18, 20, 22, 24] },
  { code: 'SUI', name: 'Switzerland', group: 'B', pages: [18, 20, 22, 24] },
  { code: 'BRA', name: 'Brazil', group: 'C', pages: [24, 26, 28, 30] },
  { code: 'MAR', name: 'Morocco', group: 'C', pages: [24, 26, 28, 30] },
  { code: 'HAI', name: 'Haiti', group: 'C', pages: [26, 28, 30, 32] },
  { code: 'SCO', name: 'Scotland', group: 'C', pages: [26, 28, 30, 32] },
  { code: 'USA', name: 'USA', group: 'D', pages: [32, 34, 36, 38] },
  { code: 'PAR', name: 'Paraguay', group: 'D', pages: [32, 34, 36, 38] },
  { code: 'AUS', name: 'Australia', group: 'D', pages: [34, 36, 38, 40] },
  { code: 'TUR', name: 'Türkiye', group: 'D', pages: [34, 36, 38, 40] },
  { code: 'GER', name: 'Germany', group: 'E', pages: [40, 42, 44, 46] },
  { code: 'CUW', name: 'Curaçao', group: 'E', pages: [40, 42, 44, 46] },
  { code: 'CIV', name: "Côte d'Ivoire", group: 'E', pages: [42, 44, 46, 48] },
  { code: 'ECU', name: 'Ecuador', group: 'E', pages: [42, 44, 46, 48] },
  { code: 'NED', name: 'Netherlands', group: 'F', pages: [48, 50, 52, 54] },
  { code: 'JPN', name: 'Japan', group: 'F', pages: [48, 50, 52, 54] },
  { code: 'SWE', name: 'Sweden', group: 'F', pages: [50, 52, 54, 56] },
  { code: 'TUN', name: 'Tunisia', group: 'F', pages: [50, 52, 54, 56] },
  { code: 'BEL', name: 'Belgium', group: 'G', pages: [58, 60, 62, 64] },
  { code: 'EGY', name: 'Egypt', group: 'G', pages: [58, 60, 62, 64] },
  { code: 'IRN', name: 'IR Iran', group: 'G', pages: [60, 62, 64, 66] },
  { code: 'NZL', name: 'New Zealand', group: 'G', pages: [60, 62, 64, 66] },
  { code: 'ESP', name: 'Spain', group: 'H', pages: [66, 68, 70, 72] },
  { code: 'CPV', name: 'Cabo Verde', group: 'H', pages: [66, 68, 70, 72] },
  { code: 'KSA', name: 'Saudi Arabia', group: 'H', pages: [68, 70, 72, 74] },
  { code: 'URU', name: 'Uruguay', group: 'H', pages: [68, 70, 72, 74] },
  { code: 'FRA', name: 'France', group: 'I', pages: [74, 76, 78, 80] },
  { code: 'SEN', name: 'Senegal', group: 'I', pages: [74, 76, 78, 80] },
  { code: 'IRQ', name: 'Iraq', group: 'I', pages: [76, 78, 80, 82] },
  { code: 'NOR', name: 'Norway', group: 'I', pages: [76, 78, 80, 82] },
  { code: 'ARG', name: 'Argentina', group: 'J', pages: [82, 84, 86, 88] },
  { code: 'ALG', name: 'Algeria', group: 'J', pages: [82, 84, 86, 88] },
  { code: 'AUT', name: 'Austria', group: 'J', pages: [84, 86, 88, 90] },
  { code: 'JOR', name: 'Jordan', group: 'J', pages: [84, 86, 88, 90] },
  { code: 'POR', name: 'Portugal', group: 'K', pages: [90, 92, 94, 96] },
  { code: 'COD', name: 'Congo DR', group: 'K', pages: [90, 92, 94, 96] },
  { code: 'UZB', name: 'Uzbekistan', group: 'K', pages: [92, 94, 96, 98] },
  { code: 'COL', name: 'Colombia', group: 'K', pages: [92, 94, 96, 98] },
  { code: 'ENG', name: 'England', group: 'L', pages: [98, 100, 102, 104] },
  { code: 'CRO', name: 'Croatia', group: 'L', pages: [98, 100, 102, 104] },
  { code: 'GHA', name: 'Ghana', group: 'L', pages: [100, 102, 104, 106] },
  { code: 'PAN', name: 'Panama', group: 'L', pages: [100, 102, 104, 106] },
];

export const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'] as const;

export type Group = typeof groups[number];

export const fwcCodes = Array.from({ length: 20 }, (_, i) => `FWC${i.toString().padStart(2, '0')}`);

export const ccCodes = Array.from({ length: 14 }, (_, i) => `CC${i + 1}`);

export const totalFigus = {
  fwc: 20,
  countries: 32 * 20,
  cc: 14,
  total: 20 + (32 * 20) + 14,
};