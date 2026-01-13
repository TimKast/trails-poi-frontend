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
  },

  async createTrail(trail: Omit<Trail, "_id" | "__v">, token: string): Promise<Trail | null> {
    try {
      const response = await fetch(`${this.baseUrl}trails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(trail)
      });
      const data = await response.json();

      if (response.ok) {
        return data as Trail;
      }
      return null;
    } catch (error) {
      console.error("Creating trail failed:", error);
      return null;
    }
  },

  deleteTrail: async (id: string, token: string): Promise<boolean> => {
    try {
      const response = await fetch(`${trailService.baseUrl}trails/${id}`, {
        method: "DELETE",
        headers: { Authorization: token }
      });

      return response.ok;
    } catch (error) {
      console.error("Deleting trail failed:", error);
      return false;
    }
  },

  addImages: async (id: string, imageUrls: string[], token: string): Promise<boolean> => {
    try {
      const response = await fetch(`${trailService.baseUrl}trails/${id}/images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(imageUrls)
      });

      return response.ok;
    } catch (error) {
      console.error("Adding images failed:", error);
      return false;
    }
  }
};
