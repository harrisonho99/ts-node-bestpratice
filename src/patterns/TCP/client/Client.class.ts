import { createConnection, Socket } from 'net';
import Log from '../../../tools/log';

class Client {
  private socket: Socket;

  constructor(private port: number, private host: string, private timeout: number) {
    this.socket = createConnection({ port: this.port, host:this.host, timeout:this.timeout });
  }

  public start() {
    this.socket.on('end', this.onRequestTerminated);
    this.socket.on('data', (data) => {
      Log.cyan(data);
    });
  }

  private onRequestTerminated() {
    Log.blueBright('Client: End!');
  }
}

export { Client };
