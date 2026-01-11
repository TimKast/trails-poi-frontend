import type { Session } from "$lib/types/session-types";

export function load({ cookies }) {
  const user = cookies.get("user");
  if (user) {
    const session = JSON.parse(user) as Session;
    return { session: session };
  }
}
