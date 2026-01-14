import { trailService } from "$lib/services/trail-service";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { loggedInUser } from "$lib/runes.svelte";

export const actions: Actions = {
  create: async ({ request }) => {
    const form = await request.formData();
    const name = form.get("name") as string;
    const description = form.get("description") as string;
    const images = form.getAll("images") as string[];
    const lat = parseFloat(form.get("lat") as string);
    const lon = parseFloat(form.get("lon") as string);

    if (!name || !description || isNaN(lat) || isNaN(lon)) {
      return fail(400, { error: "All fields are required", name, description, lat, lon });
    }

    if (lat < -90 || lat > 90) {
      return fail(400, {
        error: "Latitude must be between -90 and 90",
        name,
        description,
        lat,
        lon
      });
    }

    if (lon < -180 || lon > 180) {
      return fail(400, {
        error: "Longitude must be between -180 and 180",
        name,
        description,
        lat,
        lon
      });
    }

    const token = loggedInUser.token;
    if (!token) {
      return fail(401, {
        error: "You must be logged in to create a trail",
        name,
        description,
        lat,
        lon
      });
    }

    const trail = await trailService.createTrail(
      {
        name,
        description,
        location: { lat, lon },
        images: images
      },
      token
    );

    if (!trail) {
      return fail(500, { error: "Failed to create trail", name, description, lat, lon });
    }
    redirect(303, "/home");
  }
};
