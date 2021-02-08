import { useRouter } from "next/router";
import { useEffect } from "react";
import { firebase } from "../firebase";

/**
 * This page does not return any elements, since it is only meant for redirects.
 * This pattern of using client side redirects is everything but optimal, see
 * https://kentcdodds.com/blog/stop-using-client-side-route-redirects.
 *
 * So this approach should be changed when a better solution is found.
 */
export default function IndexPage() {
  const router = useRouter();

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          router.push("/inbox");
        } else {
          router.push("/login");
        }
      }),
    [router]
  );

  return null;
}
