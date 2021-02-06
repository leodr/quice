import {
  BadRequestException,
  Bind,
  Controller,
  Delete,
  Dependencies,
  Param,
} from "@nestjs/common";
import { FirebaseService } from "api/firebase/firebase.service";
import { FormsService } from "./forms.service";

@Controller("forms")
@Dependencies(FormsService, FirebaseService)
export class FormsController {
  constructor(
    private readonly formsService: FormsService,
    private readonly firebaseService: FirebaseService
  ) {}

  @Delete(":id")
  @Bind(Param("id"))
  async deleteForm(formId: string) {
    if (!formId) {
      throw new BadRequestException("You have to provide a non-empty form id.");
    }

    const doc = await this.firebaseService.firestore
      .collection("forms")
      .doc(formId)
      .get();

    if (!doc.exists) {
      throw new BadRequestException(
        `A form with the id \`${formId}\` does not exist.`
      );
    }

    await this.formsService.deleteFormWithSubmissions(formId);

    return "Successfully deleted form.";
  }
}
