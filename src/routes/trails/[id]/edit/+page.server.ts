import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { trailService } from "$lib/services/trail-service.js";
import { loggedInUser } from "$lib/runes.svelte.js";

export async function load({ params, fetch, parent }) {
  const { session } = await parent();

  if (!session?.token) {
    redirect(303, "/");
  }

  const response = await fetch(`http://localhost:3000/api/trails/${params.id}`, {
    method: "GET",
    headers: {
      Authorization: session?.token ?? ""
    }
  });
  const trail = await response.json();
  return { trail };
}

export const actions: Actions = {
  update: async ({ request, params }) => {
    const token = loggedInUser.token;
    const form = await request.formData();
    const name = form.get("name") as string;
    const description = form.get("description") as string;
    const lat = parseFloat(form.get("lat") as string);
    const lon = parseFloat(form.get("lon") as string);

    if (!name || !description || isNaN(lat) || isNaN(lon)) {
      return fail(400, { error: "All fields are required" });
    }

    if (lat < -90 || lat > 90) {
      return fail(400, {
        error: "Latitude must be between -90 and 90"
      });
    }

    if (lon < -180 || lon > 180) {
      return fail(400, {
        error: "Longitude must be between -180 and 180"
      });
    }

    const response = await trailService.updateTrail(
      params.id,
      {
        name,
        description,
        location: { lat, lon }
      },
      token
    );

    if (!response) {
      return fail(500, { error: "Failed to update trail" });
    }
    throw redirect(303, `/trails/${params.id}`);
  }
};
