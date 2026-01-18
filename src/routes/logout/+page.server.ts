export function load({ cookies }) {
  cookies.delete("user", { path: "/" });
}
