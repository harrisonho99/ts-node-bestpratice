import { Server } from './server/Server.class';
import { join } from 'path';
import { fork } from 'child_process';
import Log from "../../tools/log"
function forkClient(config: any) {
    
  const child = fork(config.clientJobPath);
  child.on('message', (message) => {
      Log.cyan("recived from Child: ", message)
  });
  child.send(config);
  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}
function entry() {
  const config = {
    host: 'localhost',
    port: 3100,
    timeout: 3000,
    clientJobPath: join(__dirname, 'clientJob'),
  };

  const server = new Server(config.port, config.host, config.timeout);
  server.listen(forkClient.bind(null, config));
}

export { entry };
