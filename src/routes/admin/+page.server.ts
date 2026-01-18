import { userService } from "$lib/services/user-service.js";
import { redirect } from "@sveltejs/kit";

export async function load({ parent }) {
  const { session } = await parent();
  if (session?.role !== "admin") {
    throw redirect(303, "/");
  }

  const users = await userService.getAllUsers(session.token);
  return { users };
}
