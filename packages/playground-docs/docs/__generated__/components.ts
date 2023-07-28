export type ComponentMeta = Partial<{
	sourceUrl: string;
	description: string;
	path: string;
	category: string;
	status: string;
	icon: string;
}> & { title: string; fileName: string; };
export const ComponentList: Record<string, ComponentMeta> = {
  Toast: {"title":"Toast","category":"Components","description":"A component to display toasts","icon":"NotificationIcon","status":"in-progress","sourceUrl":"https://github.com/paulhalleux/react-playground/blob/main/packages/playground/src/components/Toast/toast-context.tsx","fileName":"Toast"},
  Tabs: {"title":"Tabs","category":"Components","description":"A component to display tabs","icon":"TabsIcon","status":"in-progress","sourceUrl":"https://github.com/paulhalleux/react-playground/blob/main/packages/playground/src/components/Tabs/Tabs.tsx","fileName":"Tabs"},
  Table: {"title":"Table","category":"Components","description":"A component to display a table","icon":"TableIcon","status":"in-progress","sourceUrl":"https://github.com/paulhalleux/react-playground/blob/main/packages/playground/src/components/Table/Table.tsx","fileName":"Table"},
  Selector: {"title":"Selector","category":"Experimental","description":"A component to select a value","icon":"SelectionFrameIcon","status":"draft","sourceUrl":"https://github.com/paulhalleux/react-playground/blob/main/packages/playground/src/components/Separator/Separator.tsx","fileName":"Selector"},
  KeyframePath: {"title":"KeyframePath","category":"Experimental","description":"A component to display a path with keyframes","icon":"PointerIcon","status":"draft","sourceUrl":"https://github.com/paulhalleux/react-playground/blob/main/packages/playground/src/components/KeyframePath/KeyframePath.tsx","fileName":"KeyframePath"},
  FrameSelector: {"title":"FrameSelector","category":"Experimental","description":"A component to select a frame","icon":"SelectionIcon","status":"draft","sourceUrl":"https://github.com/paulhalleux/react-playground/blob/main/packages/playground/src/components/FrameSelector/FrameSelector.tsx","fileName":"FrameSelector"},
  CodeBlock: {"title":"Code Block","category":"Components","description":"A component to display a code block","icon":"CodeIcon","status":"done","sourceUrl":"https://github.com/paulhalleux/react-playground/blob/main/packages/playground/src/components/CodeBlock/CodeBlock.tsx","fileName":"CodeBlock"},
  Badge: {"title":"Badge","category":"Components","description":"A component to display a badge","icon":"BadgeIcon","status":"done","sourceUrl":"https://github.com/paulhalleux/react-playground/blob/main/packages/playground/src/components/Badge/Badge.tsx","fileName":"Badge"},
}