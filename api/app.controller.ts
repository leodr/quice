import { Controller, Dependencies, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
@Dependencies(AppService)
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get("hello")
	getHello() {
		return this.appService.getHello();
	}
}
