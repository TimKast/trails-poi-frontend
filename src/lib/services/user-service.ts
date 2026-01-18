import type { User } from "../types/object-types";

export const userService = {
  baseUrl: "https://alpine-trails.onrender.com/api",

  async getAllUsers(token: string): Promise<User[]> {
    try {
      const response = await fetch(`${this.baseUrl}/users`, {
        method: "GET",
        headers: { Authorization: token }
      });
      const data = await response.json();

      if (response.ok) {
        return data as User[];
      }
      return [];
    } catch (error) {
      console.error("Fetching users failed:", error);
      return [];
    }
  },

  async deleteUser(id: string, token: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: token }
      });

      return response.ok;
    } catch (error) {
      console.error("Deleting user failed:", error);
      return false;
    }
  },

  async makeAdmin(id: string, token: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/admin/${id}`, {
        method: "POST",
        headers: { Authorization: token }
      });
      return response.ok;
    } catch (error) {
      console.error("Making user admin failed:", error);
      return false;
    }
  }
};
