import { DocumentationPage } from "@/generated";

import { getDocumentationPath } from "../utils/path";

export const Routes = {
  Root: "/",
  NotFound: "*",
  Hooks: "/hooks",
  HookMask: "/hooks/:hook",
  Utilities: "/utilities",
  UtilityMask: "/utilities/:utility",
  Components: "/components",
  ComponentMask: "/components/:component",
  getComponentRoute: (page: DocumentationPage) =>
    `/components/${getDocumentationPath(page)}`,
  getHookRoute: (page: DocumentationPage) =>
    `/hooks/${getDocumentationPath(page)}`,
  getUtilityRoute: (page: DocumentationPage) =>
    `/utilities/${getDocumentationPath(page)}`,
};
