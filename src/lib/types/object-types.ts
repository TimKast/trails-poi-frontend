export interface Trail {
  _id: string;
  name: string;
  description: string;
  location: { lat: number; lon: number };
  __v: number;
}
