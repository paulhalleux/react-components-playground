import { Pagination } from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../src/components/Mdx/Example";

type PaginationExampleControls = {
  showTotal: boolean;
  showAdditionalData: boolean;
};

function PaginationExample({
  controls,
}: ExampleComponentProps<PaginationExampleControls>) {
  return (
    <Pagination currentPage={1} perPage={10} total={102}>
      <Pagination.Data showTotal={controls.showTotal}>
        {controls.showAdditionalData && (
          <div>
            <span>Additional data</span>
          </div>
        )}
      </Pagination.Data>
      <Pagination.Navigation />
    </Pagination>
  );
}

export const metadata: ExampleMetadata = {
  name: "Pagination",
  component: PaginationExample,
  display: {
    padding: true,
    align: "center",
    grow: true,
  },
  controls: [
    {
      type: "boolean",
      label: "Show total",
      property: "showTotal",
      value: true,
    },
    {
      type: "boolean",
      label: "Show additional data",
      property: "showAdditionalData",
      value: false,
    },
  ],
};
