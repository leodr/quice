import { BadRequestException, Dependencies, Injectable } from "@nestjs/common";
import { FirebaseService } from "api/firebase/firebase.service";
import firebase from "firebase-admin";
import { JsonObject } from "type-fest";

@Injectable()
@Dependencies(FirebaseService)
export class SubmissionService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(formId: string, data: JsonObject) {
    const firestore = this.firebaseService.firestore;

    const formDoc = await firestore.collection("forms").doc(formId).get();

    if (!formDoc.exists) {
      throw new BadRequestException(
        `A form with the id \`${formId}\` does not exist.`
      );
    }

    if (!formDoc.data()?.allowSubmissions) {
      throw new BadRequestException(`Submissions were disabled for this form.`);
    }

    await firestore.collection("submissions").add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      data,
      formId,
      done: false,
    });
  }
}
