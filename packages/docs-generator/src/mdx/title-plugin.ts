import kebabCase from "lodash/kebabCase.js";
import { Root } from "mdast";
import { visit } from "unist-util-visit";

export const TitlePlugin = () => (tree: Root) => {
  visit(tree, "heading", (node) => {
    visit(node, "text", (textNode) => {
      const hasMeta = textNode.value.match(
        /\{:(?<type>[a-zA-Z]+)} (?<title>.*)/,
      );
      if (hasMeta !== null) {
        node.data = {
          hName: "Title",
        };

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
            },
            children: [{ type: "text", value: title }],
          },
        ];
      } else {
        node.data = {
          ...node.data,
          hProperties: {
            // @ts-ignore
            ...node.data?.hProperties,
            id: kebabCase(textNode.value),
          },
        };
      }
    });
  });

  return tree;
};
