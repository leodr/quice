import { Dependencies, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import admin from "firebase-admin";

@Injectable()
@Dependencies(ConfigService)
export class FirebaseService {
	private _firestore: FirebaseFirestore.Firestore;

	constructor(private configService: ConfigService) {
		if (admin.apps.length === 0) {
			admin.initializeApp({
				credential: admin.credential.cert({
					projectId: this.configService.get("FIREBASE_PROJECT_ID"),
					privateKey: this.configService
						.get("FIREBASE_PRIVATE_KEY")
						.replace(/\\n/g, "\n"),
					clientEmail: this.configService.get("FIREBASE_CLIENT_EMAIL"),
				}),
			});
		}

		this._firestore = admin.firestore();
	}

	get firestore() {
		return this._firestore;
	}
}
