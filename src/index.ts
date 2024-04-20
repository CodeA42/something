import { Canvas, Canvases } from "./elements/canvas";

const canvas = Canvas.getInstance(Canvases.drawingBoard);

canvas.drawRectangle(0, 0, canvas.HTMLElement.width, canvas.HTMLElement.height);
