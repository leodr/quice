import { Module } from "@nestjs/common";
import { FormsController } from "./forms.controller";
import { FormsService } from "./forms.service";

@Module({
	controllers: [FormsController],
	providers: [FormsService],
})
export class FormsModule {}
