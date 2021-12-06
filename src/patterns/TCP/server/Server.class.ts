import { Server as NetServer, Socket } from 'net';
import Log from '../../../tools/log';

class Server {
  private server: NetServer;
  constructor(private port: number, private host: string, private timeout: number) {
    this.server = new NetServer({}, (socket: Socket) => {
      this.connectionListener(socket, this.timeout);
    });
  }

  connectionListener(socket: Socket, timeout: number) {
    socket.on('error', (error) => {
      Log.err(error);
      socket.destroy(error);
    });

    setInterval(() => {
      socket.write(JSON.stringify({ toppic: 'create random', value: Math.random() }));
    }, 1000);

    socket.pipe(socket);

    return this;
  }

  listen(cb?: Function): Server {
    this.server.listen(this.port, this.host, () => {
      Log.green('Server listen on port: ', this.port);

      if (typeof cb === 'function') cb();
    });

    return this;
  }
}

export { Server };
