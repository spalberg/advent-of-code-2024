import { TextLineStream } from "@std/streams";

export async function getLines(
  input: ReadableStream<Uint8Array>,
): Promise<Array<string>> {
  const stream = input
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream({ allowCR: true }));
  return await Array.fromAsync(stream);
}
