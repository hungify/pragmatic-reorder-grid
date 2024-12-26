import { Input } from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";

export interface DraggablePreview {
  element: HTMLElement;
  bounds: DOMRect;
}

export interface DraggableOffset {
  x: number;
  y: number;
}

export type DraggableState = "idle" | "preview" | "dragging" | "over";

export type PointerCoordinates = Pick<Input, "clientX" | "clientY">;
