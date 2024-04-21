import { CanvasNotFoundError } from "./canvas-not-found";

export enum Canvases {
  backgroundBoard = "background-board",
  trees = "trees",
}

export class Canvas {
  private static instances: { [x: string]: Canvas } = {};
  public HTMLElement: HTMLCanvasElement;

  protected constructor(element: HTMLCanvasElement) {
    this.HTMLElement = element;
  }

  public static getInstance(id: string): Canvas {
    if (!Canvas.instances[id]) {
      let element = document.querySelector<HTMLCanvasElement>(`#${id}`);

      if (!element) {
        element = document.createElement("canvas");
        element.id = id;
        element.style.width = "100%";
        element.style.height = "100%";
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
