import kebab from "lodash/kebabCase";

import { DocumentationPage } from "@/generated/types";

export function getDocumentationPath(page: DocumentationPage) {
  return page.path || kebab(page.title);
}
