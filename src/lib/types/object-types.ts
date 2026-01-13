export interface Trail {
  _id: string;
  name: string;
  description: string;
  location: { lat: number; lon: number };
  images: string[];
  __v: number;
}

export interface Poi {
  _id: string;
  name: string;
  description: string;
  location: { type: "Point"; coordinates: [number, number] };
  category: "hut" | "lake" | "peak";
  images: string[];
  __v: number;
}
