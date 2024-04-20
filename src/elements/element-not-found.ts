export class ElementNotFoundError extends Error {
  constructor(message = ElementNotFoundError.name) {
    super(message);
  }
}
