import { HtmlElement } from "./element";

export class Canvas extends HtmlElement {
  static id = "drawing-board";
  static selector = `#${this.id}`;

  public static getInstance(): HtmlElement {
    return super.getInstance(this.selector);
  }
}
