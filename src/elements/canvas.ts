import { ElementNotFoundError } from "./element-not-found";

export class Canvas {
  private static instance: Canvas;
  public HTMLElement: HTMLCanvasElement;
  static id = "drawing-board";
  static selector = `#${this.id}`;

  protected constructor(element: HTMLCanvasElement) {
    this.HTMLElement = element;
  }

  public static getInstance(): Canvas {
    if (!Canvas.instance) {
      const element = document.querySelector<HTMLCanvasElement>(this.selector);
      if (!element) {
        throw new ElementNotFoundError(`Element "${this.selector}" not found`);
      }
      Canvas.instance = new Canvas(element);
    }

    return Canvas.instance;
  }

  public drawRectangle(x: number, y: number, a: number, b: number) {
    const context = this.HTMLElement.getContext("2d");

    context?.fillRect(x, y, a, b);
  }
}
