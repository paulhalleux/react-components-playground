#!/usr/bin/env node

import {
  GenerateDocsCommand,
  GenerateIconsCommand,
  GeneratePropsCommand,
  YargsCommandManager,
} from "./commands";

(async () => {
  const manager = new YargsCommandManager("playground");
  manager.register(GenerateDocsCommand);
  manager.register(GeneratePropsCommand);
  manager.register(GenerateIconsCommand);
  await manager.run();
})();
