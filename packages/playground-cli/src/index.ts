#!/usr/bin/env node

import {
  GenerateDocsCommand,
  GeneratePropsCommand,
  YargsCommandManager,
} from "./commands";

(async () => {
  const manager = new YargsCommandManager("playground");
  manager.register(GenerateDocsCommand);
  manager.register(GeneratePropsCommand);
  await manager.run();
})();
