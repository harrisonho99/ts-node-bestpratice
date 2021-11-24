import stream from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';

function entry() {
  const output = `${join(__dirname, 'static', 'out.txt')}`;
  const readalbeStream = new stream.Readable();
  const writeableStream = new stream.Writable({ autoDestroy: true });
  const writeOutputStream = createWriteStream(output);

  readalbeStream.push('ping');
  readalbeStream.push('pong');

  readalbeStream.pipe(writeOutputStream);
}

export { entry };
