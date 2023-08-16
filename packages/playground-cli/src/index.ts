#!/usr/bin/env node

import { YargsCommandManager } from "@paulhalleux/cli";
import {
  GenerateDocsCommand,
  GenerateIconsCommand,
  GeneratePropsCommand,
} from "./commands";

(async () => {
  const manager = new YargsCommandManager("playground");
  manager.register(GenerateDocsCommand);
  manager.register(GeneratePropsCommand);
  manager.register(GenerateIconsCommand);
  await manager.run();
})();
