import { ElementNotFoundError } from "./element-not-found";

export class HtmlElement {
  private static instance: HtmlElement;
  public HTMLElement: globalThis.HTMLElement;

  protected constructor(element: globalThis.HTMLElement) {
    this.HTMLElement = element;
  }

  public static getInstance(selector: string): HtmlElement {
    if (!HtmlElement.instance) {
      const element = document.querySelector<globalThis.HTMLElement>(selector);
      if (!element) {
        throw new ElementNotFoundError(`Element "${selector}" not found`);
      }
      HtmlElement.instance = new HtmlElement(element);
    }

    return HtmlElement.instance;
  }
}
