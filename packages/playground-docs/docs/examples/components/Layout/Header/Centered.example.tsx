import { Header, Skeleton } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../../../../src/components/Mdx/Example";

function CenteredExample() {
  return (
    <Header ghost layout="centered" containerPadding={0}>
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
  name: "Centered",
  component: CenteredExample,
  display: {
    padding: true,
    align: "center",
    grow: true,
  },
};
