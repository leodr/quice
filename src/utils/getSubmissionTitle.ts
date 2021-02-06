import { FormSubmission } from "src/types/form";

export function getSubmissionTitle({ data, id }: FormSubmission) {
  if (typeof data.title === "string") return data.title;

  if (typeof data.company === "string") return data.company;
  if (typeof data.companyName === "string") return data.companyName;

  if (typeof data.name === "string") return data.name;

  if (typeof data.firstName === "string") {
    if (typeof data.lastName === "string") {
      return `${data.firstName} ${data.lastName}`;
    }

    return data.firstName;
  }

  const stringProp = Object.values(data).find(
    (value) => typeof value === "string"
  ) as string;

  if (stringProp) return stringProp;

  return id;
}
