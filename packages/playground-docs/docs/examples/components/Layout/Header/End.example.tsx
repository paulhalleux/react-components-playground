import { Header, Skeleton } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../../../../src/components/Mdx/Example";

function EndExample() {
  return (
    <Header ghost layout="end" containerPadding={0}>
      <Header.Navigation>
        <Skeleton width={100} height={20} />
        <Skeleton width={60} height={20} />
        <Skeleton width={100} height={20} />
        <Skeleton width={140} height={20} />
      </Header.Navigation>
      <Header.Logo>
        <Skeleton width={40} height={40} />
      </Header.Logo>
    </Header>
  );
}

export const metadata: ExampleMetadata = {
  name: "End",
  component: EndExample,
  display: {
    padding: true,
    align: "center",
    grow: true,
  },
};
