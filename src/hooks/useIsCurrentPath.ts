import { useRouter } from "next/router";

export function useIsCurrentPath(basePath: string) {
  const router = useRouter();

  return router.asPath.startsWith(basePath);
}
