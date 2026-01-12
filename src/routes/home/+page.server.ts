import { poiService } from "$lib/services/poi-service";
import { trailService } from "$lib/services/trail-service";

export async function load({ parent }) {
  const { session } = await parent();
  const trails = await trailService.getTrails(session?.token ?? "");
  const pois = await poiService.getPois(session?.token ?? "");
  return { trails, pois };
}
