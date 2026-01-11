import type { Session } from "$lib/types/session-types";

export const authService = {
  baseUrl: "http://localhost:3000/api/",

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await fetch(`${this.baseUrl}authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (response.ok) {
        const session: Session = {
          name: data.email,
          token: data.token,
        };
        return session;
      }
      return null;
    } catch (error) {
      console.error("Login failed:", error);
      return null;
    }
  }
};
