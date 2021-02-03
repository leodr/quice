import { Dependencies, Injectable } from "@nestjs/common";
import { FirebaseService } from "api/firebase/firebase.service";
import { TokenPayload } from "api/token/token-payload.interface";
import jwt from "jsonwebtoken";

@Injectable()
@Dependencies(FirebaseService)
export class TokenService {
	constructor(private readonly firebaseService: FirebaseService) {}

	async signToken(payload: TokenPayload) {
		const jwtSecret = await this.getSecret();

		if (!jwtSecret) {
			throw Error("The JWT secret environment variable could not be found.");
		}

		return new Promise<string>((resolve, reject) => {
			jwt.sign(payload, jwtSecret, (err, token) => {
				if (err || !token) {
					reject(err);
				} else {
					resolve(token);
				}
			});
		});
	}

	async verifyToken(token: string) {
		const jwtSecret = await this.getSecret();

		if (!jwtSecret) {
			throw Error("The JWT secret environment variable could not be found.");
		}

		return new Promise<TokenPayload>((resolve, reject) => {
			jwt.verify(token, jwtSecret, (err, payload) => {
				if (err || !payload) {
					reject(err);
				} else {
					resolve(payload as TokenPayload);
				}
			});
		});
	}

	/**
	 * Get the JWT secret from Firestore or generate a new one and store it.
	 */
	private async getSecret() {
		const firestore = this.firebaseService.firestore;

		const secretDoc = await firestore.collection("security").doc("jwt").get();

		if (secretDoc.exists && secretDoc.data()?.secret) {
			return secretDoc.data()?.secret as string;
		} else {
			const secret = this.generateSecret();

			await firestore.collection("security").doc("jwt").set({ secret });

			return secret;
		}
	}

	/**
	 * Create a random 64 character long string to act as a JWT secret.
	 */
	private generateSecret() {
		const chars: string[] = [];
		const possibleCharacters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		const charactersLength = possibleCharacters.length;

		for (let i = 0; i < 64; i++) {
			chars.push(
				possibleCharacters.charAt(Math.floor(Math.random() * charactersLength))
			);
		}

		return chars.join("");
	}
}
