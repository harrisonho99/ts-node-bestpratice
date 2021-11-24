import { entry } from './patterns/stream';

main(entry);

async function main(...funcs: Function[]) {
  funcs.forEach((func) => func());
}
