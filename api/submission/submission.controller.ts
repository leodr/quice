import {
	BadRequestException,
	Bind,
	Body,
	Controller,
	Dependencies,
	Headers,
	Logger,
	Post,
} from "@nestjs/common";
import { TokenPayload } from "api/token/token-payload.interface";
import { TokenService } from "api/token/token.service";
import { JsonObject } from "type-fest";
import { SubmissionService } from "./submission.service";

@Controller()
@Dependencies(TokenService, SubmissionService)
export class SubmissionController {
	private readonly logger = new Logger(SubmissionController.name);

	constructor(
		private tokenService: TokenService,
		private submissionService: SubmissionService
	) {}

	@Post("submit")
	@Bind(Headers("authorization"), Body())
	async submit(authHeader: string | undefined, body: JsonObject) {
		if (!authHeader) {
			throw new BadRequestException("No authorization header specified.");
		}

		if (!/^bearer /i.test(authHeader)) {
			throw new BadRequestException(
				"Authorization header has to start with `bearer `."
			);
		}

		const token = authHeader.substr(7);

		let payload: TokenPayload;

		try {
			payload = await this.tokenService.verifyToken(token);
		} catch (e) {
			this.logger.error(e);

			throw new BadRequestException("Invalid authorization token.");
		}

		await this.submissionService.create(payload.fid, body);

		return "Successfully submitted form.";
	}
}
