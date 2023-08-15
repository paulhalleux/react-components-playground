import { Header, Skeleton } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../../../../src/components/Mdx/Example";

function ThreeColumnExample() {
  return (
    <Header ghost layout="3-column" containerPadding={0}>
      <Header.Logo>
        <Skeleton width={40} height={40} />
      </Header.Logo>
      <Header.Navigation>
        <Skeleton width={100} height={20} />
        <Skeleton width={60} height={20} />
        <Skeleton width={100} height={20} />
        <Skeleton width={140} height={20} />
      </Header.Navigation>
      <Header.Actions>
        <Skeleton width={20} height={20} />
        <Skeleton width={20} height={20} />
        <Skeleton width={20} height={20} />
      </Header.Actions>
    </Header>
  );
}

export const metadata: ExampleMetadata = {
  name: "3-Column",
  component: ThreeColumnExample,
  display: {
    padding: true,
    align: "center",
    grow: true,
  },
};
