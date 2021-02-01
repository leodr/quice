import {
	BadRequestException,
	Bind,
	Controller,
	Dependencies,
	Get,
	Query,
} from "@nestjs/common";
import { FirebaseService } from "api/firebase/firebase.service";
import { TokenService } from "./token.service";

@Controller("token")
@Dependencies(TokenService, FirebaseService)
export class TokenController {
	constructor(
		private readonly tokenService: TokenService,
		private readonly firebaseService: FirebaseService
	) {}

	@Get()
	@Bind(Query("formId"))
	async getToken(formId?: string) {
		if (!formId) {
			throw new BadRequestException(
				"The `formId` parameter has to be provided."
			);
		}

		const firestore = await this.firebaseService.firestore;

		const doc = await firestore.collection("forms").doc(formId).get();

		if (!doc.exists) {
			throw new BadRequestException(
				`A form with the id \`${formId}\` does not exist.`
			);
		}

		const token = await this.tokenService.signToken({
			fid: formId,
			iat: Date.now(),
		});

		return token;
	}
}
