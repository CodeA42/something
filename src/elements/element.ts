import { ElementNotFoundError } from "./element-not-found";

export class HtmlElement<HtmlElementType extends globalThis.HTMLElement> {
  private static instance: HtmlElement<any>;
  public HTMLElement: HtmlElementType;

  protected constructor(element: HtmlElementType) {
    this.HTMLElement = element;
  }

  public static getInstance<T extends globalThis.HTMLElement>(
    selector: string
  ): HtmlElement<T> {
    if (!HtmlElement.instance) {
      const element = document.querySelector<T>(selector);
      if (!element) {
        throw new ElementNotFoundError(`Element "${selector}" not found`);
      }
      HtmlElement.instance = new HtmlElement<T>(element);
    }

    return HtmlElement.instance;
  }
}
