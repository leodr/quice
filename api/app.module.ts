import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { FormsModule } from "./forms/forms.module";
import { PrismaService } from "./prisma/prisma.service";
import { SubmissionModule } from "./submission/submission.module";

@Module({
  imports: [
    SubmissionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // Next.js already loads the .env file for us.
      ignoreEnvFile: true,
    }),
    FormsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
