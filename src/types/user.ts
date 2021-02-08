import { FirebaseDoc } from "./firebase";

export interface User extends FirebaseDoc {
  firstName: string;
  lastName: string;
  emailAddress: string;
}
