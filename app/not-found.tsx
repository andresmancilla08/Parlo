import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Una URL que no existe no debe dejar al usuario en un callejón: si tiene la
// sesión abierta va a su app, y si no, al inicio.
export default async function NotFound() {
  const signedIn = Boolean((await cookies()).get("parlo_session")?.value);
  redirect(signedIn ? "/app" : "/");
}
