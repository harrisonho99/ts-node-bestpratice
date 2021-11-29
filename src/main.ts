import { entry } from './patterns/TCP';

main(entry);

async function main(...funcs: Function[]) {
  funcs.forEach((func) => func());
}
