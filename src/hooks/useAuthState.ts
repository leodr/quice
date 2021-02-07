import { useEffect, useState } from "react";
import { auth, firebase } from "../firebase";

export function useAuthState() {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => auth.onAuthStateChanged(setUser), []);

  return user;
}
