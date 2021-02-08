import { useEffect, useState } from "react";

export function useHost(): string {
  const [host, setHost] = useState("");

  useEffect(() => {
    setHost(window.location.host);
  }, []);

  return host;
}
