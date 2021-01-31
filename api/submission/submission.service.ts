import { Dependencies, Injectable } from "@nestjs/common";
import { FirebaseService } from "api/firebase/firebase.service";
import firebase from "firebase-admin";
import { JsonObject } from "type-fest";

@Injectable()
@Dependencies(FirebaseService)
export class SubmissionService {
	constructor(private readonly firebaseService: FirebaseService) {}

	async create(formId: string, data: JsonObject) {
		const firestore = this.firebaseService.firestore;

		await firestore.collection("submissions").add({
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			data,
			formId,
			readAt: null,
		});
	}
}
