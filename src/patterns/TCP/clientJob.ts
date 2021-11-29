import { Client } from './client/Client.class';

process.on('message', function (config: any) {
  console.log('received from Main:', config);
  const client = new Client(config.port, config.host, config.timeout);
  client.start();
});

if (typeof process.send === 'function') {
  process.send({ hello: 'from child process' });
}
