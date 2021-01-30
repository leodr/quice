import type { JsonObject } from "type-fest";
import type { firebase } from "../firebase/client";
import { FirebaseDoc } from "./firebase";

type Color =
	| "orange"
	| "yellow"
	| "green"
	| "teal"
	| "indigo"
	| "purple"
	| "pink";

export interface Form extends FirebaseDoc {
	color: Color;
	name: string;
	slug: string;
	owner: FormOwner;
}

interface FormOwner {
	type: "user" | "team";
	id: string;
}

export interface FormSubmission extends FirebaseDoc {
	createdAt: firebase.firestore.Timestamp;
	data: JsonObject;
	formId: string;
	readAt?: firebase.firestore.Timestamp;
}
