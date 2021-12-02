import { createConnection, Socket } from 'net';
import Log from '../../../tools/log';

class Client {
  private socket: Socket | undefined;

  constructor(private port: number, private host: string, private timeout: number) {
    this.createConnection();
  }

  private createConnection() {
    this.socket = createConnection({ port: this.port, host: this.host });
  }
  public start() {
    if (typeof this.socket !== 'undefined') {
      this.socket.on('end', this.onRequestTerminated);
      this.socket.on('data', (data) => {
        Log.cyan('client recived: ', JSON.stringify({ data: JSON.parse(data.toString()) }));
      });
    }
  }

  private onRequestTerminated() {
    Log.blueBright('Client: End!');
    this.createConnection();
    this.start();
  }
}

export { Client };
