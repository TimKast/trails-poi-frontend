import { poiService } from "$lib/services/poi-service.js";
import { redirect } from "@sveltejs/kit";

export async function load({ parent, params }) {
  const { session } = await parent();

  if (!session?.token) {
    redirect(303, "/");
  }
  const poiId = params.id;
  const poi = await poiService.getPoiById(poiId, session?.token ?? "");
  return { poi };
}
