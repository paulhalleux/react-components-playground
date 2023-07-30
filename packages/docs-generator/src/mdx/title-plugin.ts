import kebabCase from "lodash/kebabCase.js";
import { Root } from "mdast";
import { visit } from "unist-util-visit";

export const TitlePlugin = () => (tree: Root) => {
  visit(tree, "heading", (node) => {
    if (isWrapped(node)) {
      return;
    }

    visit(node, "text", (textNode) => {
      Object.assign(
        node,
        wrap(
          node,
          "custom-title",
          "Title",
          {
            hProperties: {
              id: kebabCase(textNode.value),
            },
          },
          {
            hProperties: {
              level: node.depth,
            },
          },
        ),
      );

      const hasMeta = textNode.value.match(
        /\{:(?<type>[a-zA-Z]+)} (?<title>.*)/,
      );

      if (hasMeta !== null) {
        const titleType = hasMeta.groups.type;
        const title = hasMeta.groups.title;

        node.children = [
          {
            // @ts-expect-error: custom node
            type: "api-type",
            data: {
              hName: "ApiType",
              hProperties: {
                type: titleType,
              },
            },
          },
          {
            // @ts-expect-error: custom node
            type: "heading",
            depth: node.depth,
            data: {
              hProperties: {
                id: kebabCase(title),
                "data-type": titleType,
              },
              wrapped: true,
            },
            children: [{ type: "text", value: title }],
          },
        ];
      }
    });
  });

  return tree;
};

function wrap(
  node: any,
  type: string,
  name: string,
  props?: any,
  wrapperProps?: any,
): any {
  return {
    type,
    data: {
      hName: name,
      ...(wrapperProps ?? {}),
    },
    children: [
      {
        ...node,
        data: {
          ...node.data,
          ...(props ?? {}),
          wrapped: true,
        },
      },
    ],
  };
}

function isWrapped(node: any) {
  return node.data?.wrapped;
}
