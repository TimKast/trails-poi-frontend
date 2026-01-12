import type { Trail } from "$lib/types/object-types";

export const trailService = {
  baseUrl: "http://localhost:3000/api/",

  async getTrails(token: string): Promise<Trail[]> {
    try {
      const response = await fetch(`${this.baseUrl}trails`, {
        method: "GET",
        headers: { Authorization: token }
      });
      const data = await response.json();

      if (response.ok) {
        return data as Trail[];
      }
      return [];
    } catch (error) {
      console.error("Fetching trails failed:", error);
      return [];
    }
  },

  async getTrailById(id: string, token: string): Promise<Trail | null> {
    try {
      const response = await fetch(`${this.baseUrl}trails/${id}`, {
        method: "GET",
        headers: { Authorization: token }
      });
      const data = await response.json();

      if (response.ok) {
        return data as Trail;
      }
      return null;
    } catch (error) {
      console.error("Fetching trail by ID failed:", error);
      return null;
    }
  }
};
