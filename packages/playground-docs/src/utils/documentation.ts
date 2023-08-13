import { Registry } from "../../docs/__generated__/registry";
import {
  ComponentMeta,
  DocumentationPage,
  DocumentationType,
  HookMeta,
  UtilityMeta,
} from "../types/documentation";

export const ComponentDocumentations = getDocumentationsOfType<ComponentMeta>(
  DocumentationType.Component,
);

export const HookDocumentations = getDocumentationsOfType<HookMeta>(
  DocumentationType.Hook,
);

export const UtilityDocumentations = getDocumentationsOfType<UtilityMeta>(
  DocumentationType.Utility,
);

export function getDocumentationsOfType<RType>(type: DocumentationType) {
  return Object.entries(Registry)
    .filter(([, value]) => value.type === type)
    .reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, DocumentationPage<RType>>,
    );
}
