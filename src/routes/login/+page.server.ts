import { dev } from "$app/environment";
import { authService } from "$lib/services/auth-service";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const form = await request.formData();
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const session = await authService.login(email, password);

    if (session) {
      const userJson = JSON.stringify(session);
      cookies.set("user", userJson, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: !dev,
        maxAge: 60 * 60 * 24
      });
      throw redirect(303, "/");
    } else {
      return {
        success: false,
        email,
        error: "Invalid email or password."
      };
    }
  }
};
