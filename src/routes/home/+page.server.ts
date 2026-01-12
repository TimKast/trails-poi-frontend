import { trailService } from "$lib/services/trail-service";

export async function load({ parent }) {
  const { session } = await parent();
  const trails = await trailService.getTrails(session?.token ?? "");
  return { trails };
}
