import { Buffer } from 'buffer';

function createBuff() {
  for (let i = 0; i < 1000; i++) {
    const firstBuffer: Buffer = Buffer.from(
      'hoaafoahfoafhaoshaoifhoasfhasofhaofa ashfoahfoassh f \n'
    );

    const poolSize = Buffer.poolSize;
    console.log({ poolSize, bytePerElem: firstBuffer.BYTES_PER_ELEMENT });
  }
}

export { createBuff };
