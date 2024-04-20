export class CanvasNotFoundError extends Error {
  constructor(message = CanvasNotFoundError.name) {
    super(message);
  }
}
