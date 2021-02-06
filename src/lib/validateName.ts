import kebabCase from "lodash.kebabcase";
import { firestore } from "src/firebase/client";

export async function validateName(name: string) {
  const slug = kebabCase(name);

  if (invalidSlugs.includes(slug)) {
    return "This URL is reserved, please choose another name.";
  }

  const formWithSameSlug = await firestore
    .collection("forms")
    .where("slug", "==", slug)
    .get();

  if (formWithSameSlug.size > 0) {
    return "A form with this URL already exists.";
  }

  return true;
}

const invalidSlugs = ["new-form", "login", "join", "inbox", "tasks"];
