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
    const coordinates = form.getAll("coordinates") as string[];

    if (!name || !description || !coordinates || coordinates.length === 0) {
      return fail(400, {
        error: "All fields and at least one coordinate are required",
        name,
        description
      });
    }

    const token = loggedInUser.token;
    if (!token) {
      return fail(401, {
        error: "You must be logged in to create a trail",
        name,
        description,
        coordinates
      });
    }

    const trail = await trailService.createTrail(
      {
        name,
        description,
        geometry: {
          type: "LineString",
          coordinates: coordinates.map((coord) => JSON.parse(coord) as [number, number, number?])
        },
        images: images
      },
      token
    );

    if (!trail) {
      return fail(500, { error: "Failed to create trail", name, description });
    }
    redirect(303, "/home");
  }
};
