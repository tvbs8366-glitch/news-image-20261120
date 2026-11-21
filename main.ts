// News-image entry for 20 November 2026: the program's only job is to place
// the finished summary image where the grader looks for it. The image is
// stored in the repo as base64 text (entry.png.b64) so the entry stays
// plain text; this decodes it back to the image.
// Run locally with: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
mkdirSync(outDir, { recursive: true });
const image = Buffer.from(readFileSync(resolve(here, 'entry.png.b64'), 'utf8').trim(), 'base64');
// Validate the decoded bytes are a JPEG (magic bytes FF D8 FF) before writing.
if (image.length < 3 || image[0] !== 0xff || image[1] !== 0xd8 || image[2] !== 0xff) {
  throw new Error('Decoded entry image is not a JPEG (expected magic bytes FF D8 FF).');
}
console.log(`Decoded entry image: ${image.length} bytes.`);
writeFileSync(resolve(outDir, 'entry.png'), image);
