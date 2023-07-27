export type ComponentMeta = Partial<{
	description: string;
	path: string;
	category: string;
	status: string;
	icon: string;
}> & { title: string; fileName: string; };
export const ComponentList: Record<string, ComponentMeta> = {
  Toast: {"title":"Toast","category":"Components","description":"A component to display toasts","icon":"NotificationIcon","status":"in-progress","fileName":"Toast"},
  Tabs: {"title":"Tabs","category":"Components","description":"A component to display tabs","icon":"TabsIcon","status":"in-progress","fileName":"Tabs"},
  Table: {"title":"Table","category":"Components","description":"A component to display a table","icon":"TableIcon","status":"in-progress","fileName":"Table"},
  Selector: {"title":"Selector","category":"Components","description":"A component to select a value","icon":"SelectionFrameIcon","status":"draft","fileName":"Selector"},
  KeyframePath: {"title":"KeyframePath","category":"Components","description":"A component to display a path with keyframes","icon":"PointerIcon","status":"draft","fileName":"KeyframePath"},
  FrameSelector: {"title":"FrameSelector","category":"Components","description":"A component to select a frame","icon":"SelectionIcon","status":"draft","fileName":"FrameSelector"},
  CodeBlock: {"title":"Code Block","category":"Components","description":"A component to display a code block","icon":"CodeIcon","status":"done","fileName":"CodeBlock"},
  Badge: {"title":"Badge","category":"Components","description":"A component to display a badge","icon":"BadgeIcon","status":"done","fileName":"Badge"},
}