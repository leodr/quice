import type { JsonObject } from "type-fest";
import type { firebase } from "../firebase/client";
import { FirebaseDoc } from "./firebase";

export type FormColor =
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "indigo"
  | "purple"
  | "pink";

export interface Form extends FirebaseDoc {
  color: FormColor;
  name: string;
  description: string;
  slug: string;
  allowSubmissions?: boolean;
}

export interface FormSubmission extends FirebaseDoc {
  createdAt: firebase.firestore.Timestamp;
  data: JsonObject;
  formId: string;
  readAt?: firebase.firestore.Timestamp;
  done?: boolean;
}
