import { Button, Card } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../../../../src/components/Mdx/Example";

function GroupExample() {
  return (
    <Card.Group>
      <Card>
        <Card.Thumbnail border maxHeight={150}>
          <img src="https://via.placeholder.com/150" alt="placeholder" />
        </Card.Thumbnail>
        <Card.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          consectetur, nisl ut aliquam ultricies, massa sapien aliquet nunc, non
          aliquam nisl nunc vel nunc. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
        </Card.Body>
        <Card.Footer>
          <Button size="small">View</Button>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Thumbnail border maxHeight={150}>
          <img src="https://via.placeholder.com/150" alt="placeholder" />
        </Card.Thumbnail>
        <Card.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          consectetur, nisl ut aliquam ultricies, massa sapien aliquet nunc, non
          aliquam nisl nunc vel nunc. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
        </Card.Body>
        <Card.Footer>
          <Button size="small">View</Button>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Thumbnail border maxHeight={150}>
          <img src="https://via.placeholder.com/150" alt="placeholder" />
        </Card.Thumbnail>
        <Card.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          consectetur, nisl ut aliquam ultricies, massa sapien aliquet nunc, non
          aliquam nisl nunc vel nunc. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
        </Card.Body>
        <Card.Footer>
          <Button size="small">View</Button>
        </Card.Footer>
      </Card>
    </Card.Group>
  );
}

export const metadata: ExampleMetadata = {
  name: "Group",
  component: GroupExample,
  display: {
    padding: true,
    align: "center",
    grow: true,
  },
};
