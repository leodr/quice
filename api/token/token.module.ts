import { Module } from "@nestjs/common";
import { FirebaseService } from "api/firebase/firebase.service";
import { TokenController } from "./token.controller";
import { TokenService } from "./token.service";

@Module({
	controllers: [TokenController],
	providers: [TokenService, FirebaseService],
})
export class TokenModule {}
