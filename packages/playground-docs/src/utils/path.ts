import kebab from "lodash/kebabCase";

import { DocumentationPage } from "../types/documentation";

export function getDocumentationPath(page: DocumentationPage) {
  return page.path || kebab(page.title);
}
