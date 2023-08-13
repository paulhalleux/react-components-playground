import { Skeleton } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../../../src/components/Mdx/Example";

function SkeletonExample() {
  return (
    <Skeleton.Container alignItems="flex-start" gap={16}>
      <Skeleton.Container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Skeleton width={50} height={50} radius="50%" />
        <Skeleton.Container>
          <Skeleton width={100} height={20} />
          <Skeleton width={50} height={10} />
        </Skeleton.Container>
      </Skeleton.Container>
      <Skeleton.Container>
        <Skeleton width={400} height={16} />
        <Skeleton width={380} height={16} />
      </Skeleton.Container>
    </Skeleton.Container>
  );
}

export const metadata: ExampleMetadata = {
  name: "Skeleton",
  component: SkeletonExample,
  display: {
    padding: true,
    align: "center",
  },
};
