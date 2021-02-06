import { Module } from "@nestjs/common";
import { FirebaseService } from "api/firebase/firebase.service";
import { FormsController } from "./forms.controller";
import { FormsService } from "./forms.service";

@Module({
  controllers: [FormsController],
  providers: [FormsService, FirebaseService],
})
export class FormsModule {}
