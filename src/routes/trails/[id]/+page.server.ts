import { trailService } from "$lib/services/trail-service.js";

export async function load({ parent, params }) {
  const { session } = await parent();
  const trailId = params.id;
  const trail = await trailService.getTrailById(trailId, session?.token ?? "");
  return { trail };
}
