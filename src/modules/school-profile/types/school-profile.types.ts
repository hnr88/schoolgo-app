export interface SchoolProfileDetails {
  documentId: string;
  name: string;
  description: string | null;
  website: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
}

export interface SchoolTuitionBand {
  documentId: string;
  band: string;
  annualTuition: number;
  currency: string;
}

export interface SchoolCapacityRow {
  documentId: string;
  band: string;
  totalPlaces: number;
  availablePlaces: number;
}
