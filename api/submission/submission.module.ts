import { Module } from "@nestjs/common";
import { FirebaseService } from "api/firebase/firebase.service";
import { SubmissionController } from "./submission.controller";
import { SubmissionService } from "./submission.service";

@Module({
  imports: [],
  controllers: [SubmissionController],
  providers: [SubmissionService, FirebaseService],
})
export class SubmissionModule {}
