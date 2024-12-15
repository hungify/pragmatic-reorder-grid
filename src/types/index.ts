export type TItem = {
  id: number;
  title: string;
  image?: string;
};
export type DraggableState = "idle" | "preview" | "dragging" | "over";
