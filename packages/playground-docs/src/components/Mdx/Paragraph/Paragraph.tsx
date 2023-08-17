import { PropsWithChildren } from "react";
import { Text } from "@paulhalleux/react-playground";

type ParagraphProps = PropsWithChildren;

export function Paragraph({ children }: ParagraphProps) {
  return (
    <Text type="text-md" variant="secondary">
      {children}
    </Text>
  );
}
