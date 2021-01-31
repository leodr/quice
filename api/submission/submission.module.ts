import { Module } from "@nestjs/common";
import { FirebaseService } from "api/firebase/firebase.service";
import { TokenService } from "api/token/token.service";
import { SubmissionController } from "./submission.controller";
import { SubmissionService } from "./submission.service";

@Module({
	imports: [],
	controllers: [SubmissionController],
	providers: [SubmissionService, TokenService, FirebaseService],
})
export class SubmissionModule {}
