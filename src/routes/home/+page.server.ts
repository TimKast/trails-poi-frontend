import { poiService } from "$lib/services/poi-service";
import { trailService } from "$lib/services/trail-service";
import { redirect } from "@sveltejs/kit";

export async function load({ parent }) {
  const { session } = await parent();

  if (!session?.token) {
    redirect(303, "/");
  }

  const trails = await trailService.getTrails(session?.token ?? "");
  const pois = await poiService.getPois(session?.token ?? "");
  return { trails, pois };
}
