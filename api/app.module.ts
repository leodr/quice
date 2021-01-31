import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SubmissionModule } from "./submission/submission.module";

@Module({
	imports: [
		SubmissionModule,
		ConfigModule.forRoot({
			isGlobal: true,
			// Next.js already loads the .env file for us.
			ignoreEnvFile: true,
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
