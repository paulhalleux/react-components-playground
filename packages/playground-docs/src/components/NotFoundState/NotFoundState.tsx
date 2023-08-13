import React from "react";
import { CleanIcon, EmptyState } from "@paulhalleux/react-playground";

export function NotFoundState() {
  return (
    <EmptyState
      variant="ghost"
      icon={CleanIcon}
      title="Page not found"
      description="The page you are looking for does not exist."
      actions={[{ type: "link", label: "Go back home", to: "/" }]}
    />
  );
}
