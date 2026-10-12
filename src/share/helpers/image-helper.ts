import {toPng} from "html-to-image";

export async function downloadNodeAsPng(node: HTMLElement, fileName: string, width: number, height: number) {
  await document.fonts.ready;

  const dataUrl = await toPng(node, {width, height, pixelRatio: 2});

  const link = document.createElement("a");
  link.download = fileName;
  link.href = dataUrl;
  link.click();
}
