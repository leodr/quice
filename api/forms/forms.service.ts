import { Dependencies, Injectable } from "@nestjs/common";
import { FirebaseService } from "api/firebase/firebase.service";
import { firestore } from "firebase-admin";

@Injectable()
@Dependencies(FirebaseService)
export class FormsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async deleteFormWithSubmissions(formId: string) {
    const firestore = this.firebaseService.firestore;

    const query = firestore
      .collection("submissions")
      .where("formId", "==", formId)
      .limit(100);

    await new Promise<void>((resolve, reject) => {
      this.deleteQueryBatch(query, resolve).catch(reject);
    });

    await firestore.collection("forms").doc(formId).delete();
  }

  /**
   * A recursive function to delete every document in a query with batching.
   */
  private async deleteQueryBatch(
    query: firestore.Query,
    resolve: VoidFunction
  ) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      resolve();
      return;
    }

    const firestore = this.firebaseService.firestore;

    // Delete documents in a batch
    const batch = firestore.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid exploding the stack.
    process.nextTick(() => {
      this.deleteQueryBatch(query, resolve);
    });
  }
}
