import { trailService } from "$lib/services/trail-service.js";
import { redirect } from "@sveltejs/kit";

export async function load({ parent, params }) {
  const { session } = await parent();

  if (!session?.token) {
    redirect(303, "/");
  }

  const trailId = params.id;
  const trail = await trailService.getTrailById(trailId, session?.token ?? "");
  return { trail };
}
