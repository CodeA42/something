import { CanvasNotFoundError } from "./canvas-not-found";

export enum Canvases {
  drawingBoard = "drawing-board",
}

export class Canvas {
  private static instances: { [x: string]: Canvas } = {};
  public HTMLElement: HTMLCanvasElement;

  protected constructor(element: HTMLCanvasElement) {
    this.HTMLElement = element;
  }

  public static getInstance(id: string): Canvas {
    if (!Canvas.instances[id]) {
      const element = document.querySelector<HTMLCanvasElement>(`#${id}`);
      if (!element) {
        throw new CanvasNotFoundError(`Canvas with id "${id}" not found`);
      }
      Canvas.instances[id] = new Canvas(element);
    }

    return Canvas.instances[id];
  }

  public drawRectangle(x: number, y: number, width: number, height: number) {
    const context = this.HTMLElement.getContext("2d");

    context?.fillRect(x, y, width, height);
  }
}
