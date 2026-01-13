import { poiService } from "$lib/services/poi-service.js";

export async function load({ parent, params }) {
  const { session } = await parent();
  const poiId = params.id;
  const poi = await poiService.getPoiById(poiId, session?.token ?? "");
  return { poi };
}
