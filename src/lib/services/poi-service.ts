import type { Poi } from "$lib/types/object-types";

export const poiService = {
  baseUrl: "https://alpine-trails.onrender.com/api",

  async getPois(token: string): Promise<Poi[]> {
    try {
      const response = await fetch(`${this.baseUrl}/pois`, {
        method: "GET",
        headers: { Authorization: token }
      });
      const data = await response.json();

      if (response.ok) {
        return data as Poi[];
      }
      return [];
    } catch (error) {
      console.error("Fetching pois failed:", error);
      return [];
    }
  },

  async getPoiById(id: string, token: string): Promise<Poi | null> {
    try {
      const response = await fetch(`${this.baseUrl}/pois/${id}`, {
        method: "GET",
        headers: { Authorization: token }
      });
      const data = await response.json();

      if (response.ok) {
        return data as Poi;
      }
      return null;
    } catch (error) {
      console.error("Fetching poi by ID failed:", error);
      return null;
    }
  }
};
