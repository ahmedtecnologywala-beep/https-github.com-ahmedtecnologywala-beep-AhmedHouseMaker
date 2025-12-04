export enum Unit {
  SQ_FT = 'Sq. Ft',
  SQ_YD = 'Sq. Yd (Gaz)',
  MARLA = 'Marla',
  METER = 'Sq. Meters'
}

export enum Style {
  MODERN = 'Modern',
  MINIMALIST = 'Minimalist',
  TRADITIONAL = 'Traditional',
  CONTEMPORARY = 'Contemporary',
  ISLAMIC_MODERN = 'Islamic Modern',
  LUXURY = 'Luxury'
}

export enum Priority {
  SPACE_SAVING = 'Space Saving',
  VENTILATION = 'Ventilation & Airflow',
  NATURAL_LIGHT = 'Natural Light',
  PRIVACY = 'Privacy'
}

export interface PlanInputs {
  plotArea: number;
  unit: Unit;
  bedrooms: number;
  bathrooms: number;
  floors: number;
  style: Style;
  priority: Priority;
  budget: 'Low' | 'Medium' | 'High';
}

export interface ColorTheme {
  name: string;
  primary: string; // Hex code
  accent: string; // Hex code
  secondary: string; // Hex code
  description: string;
}

export interface RoomBreakdown {
  name: string;
  size: string; // e.g. "12x14 ft"
  description: string;
  generatedImage?: string; // Base64 or URL
}

export interface GeneratedLayout {
  id: string; // Unique ID for saving
  name: string; // e.g., "Compact Efficient", "Luxury Spacious"
  description: string;
  totalArea: string;
  estimatedCost: string;
  rooms: RoomBreakdown[];
  features: string[];
  colorTheme: ColorTheme;
  exteriorImage?: string; // Base64 or URL
  structureImage?: string; // Base64 or URL for Blueprint
  createdAt: string;
}

export type ViewState = 'home' | 'features' | 'generator' | 'pricing' | 'contact' | 'saved';