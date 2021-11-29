import { join } from 'path';
import { createWriteStream, WriteStream, readFile, createReadStream, ReadStream } from 'fs';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import Log from '../../tools/log';
import { EventEmitter, Readable } from 'stream';

export class StreamPractical {
  private fileStream: WriteStream | undefined;
  private readonly PORT: number = 3100;
  private readonly TXT: string = '.txt';
  private currentFile: string = StreamPractical.resolvePath('sample.txt');
  private text: string = `To use a header to override the method, specify the header name as a string argument to the methodOverride function. To then make the call, send a POST request to a URL with the overridden method as the value of that header. This method of using a header would typically be used in conjunction with XMLHttpRequest on 
    implementations that do not support the method you are trying to use.`;

  private pipeStringToClient(len: number = 1e3, res: ServerResponse) {
    const str = new Array(len).fill(this.text).join('\n');
    const readableString = new Readable({ highWaterMark: 1024 });
    readableString.push(str);
    readableString.push(null);
    readableString.pipe(res);
  }

  public creatBigfile(name: string = 'sample', interator: number = 1e6) {
    const fileName = name + this.TXT;
    this.currentFile = StreamPractical.resolvePath(fileName);
    this.fileStream = createWriteStream(this.currentFile);
    for (let i = 0; i < interator; i++) {
      this.fileStream.write(
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n'
      );
    }

    this.fileStream.end();
    Log.blue('create big file done!');
  }

  public createServer() {
    Log.green('create server');
    const server = createServer();
    server.keepAliveTimeout = 2 * 60 * 100000000;

    server.on('request', (req: IncomingMessage, res: ServerResponse) => {
      //   this.useFSReadFile(res);
      // this.useStreamFile(res);
      this.pipeStringToClient(1e4, res);
    });

    server.listen(this.PORT, () => {
      Log.cyan('server listen on port : ', this.PORT);
    });
  }

  private useFSReadFile(res: ServerResponse) {
    if (this.currentFile)
      readFile(this.currentFile, (error: NodeJS.ErrnoException | null, data: Buffer) => {
        if (error) {
          return this.ResponseError(res, undefined, error.message);
        }
        res.end(data);
      });
  }

  private handleStreamingError(src: ReadStream, res: ServerResponse) {
    src.on('error', () => {
      Log.red('error occured in stream event');
      src.destroy();
      res.end();
      this.removeListeners(src, res);
    });
    src.on('end', () => {
      Log.red('stream end');
      src.destroy();
      res.end();
      this.removeListeners(src, res);
    });
    res.on('close', () => {
      Log.red('conn close');
      src.destroy();
      res.end();
      this.removeListeners(src, res);
    });
  }

  private removeListeners(...args: EventEmitter[]) {
    args.forEach((event) => {
      event.removeAllListeners();
    });
  }

  private useStreamFile(res: ServerResponse) {
    const src = createReadStream(this.currentFile, { highWaterMark: 1024 });
    this.handleStreamingError(src, res);
    src.pipe(res);
  }

  private ResponseError(res: ServerResponse, code: number = 400, message = 'error') {
    res.writeHead(code, undefined, { 'Content-Type': 'application/json' });
    res.write({ message });
    res.end();
  }

  public static resolvePath(fileName: string = 'sample.txt'): string {
    return `${join(__dirname, '..', '..', '..', 'static', fileName)}`;
  }
}
