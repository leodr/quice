import {
  BadRequestException,
  Bind,
  Body,
  Controller,
  Dependencies,
  Param,
  Post,
} from "@nestjs/common";
import { JsonValue } from "type-fest";
import { SubmissionService } from "./submission.service";

@Controller("forms/:formId/submissions")
@Dependencies(SubmissionService)
export class SubmissionController {
  constructor(private submissionService: SubmissionService) {}

  @Post()
  @Bind(Param("formId"), Body())
  async submit(formId: string | undefined, body: JsonValue) {
    if (!formId) {
      throw new BadRequestException("No form id specified specified.");
    }

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      throw new BadRequestException(
        "The request body has to contain a JSON object."
      );
    }

    await this.submissionService.create(formId, body);

    return "Successfully submitted form.";
  }
}
