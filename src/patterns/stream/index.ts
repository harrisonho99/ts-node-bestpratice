import { StreamPractical } from './StreamPractical.class';
function entry() {
  const streamP = new StreamPractical();
  // streamP.creatBigfile(undefined, 1e5);
  streamP.createServer();
}

export { entry };
