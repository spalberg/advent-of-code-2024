import { loadInput } from "utils";

export function part1(input: Array<string>) {
  const files = parseDiskFiles(input);
  let checksum = 0;
  let l = 0, r = files.length - 1;
  let rFile: File;
  for (let i = 0; l < r; i++) {
    while (files[l].size === 0) l++;
    let id: number;
    const lFile = files[l];
    if (lFile.id !== null) {
      id = lFile.id;
      lFile.size--;
    } else {
      rFile = files[r];
      while (l < r && (rFile.id === null || rFile.size === 0)) {
        r--;
        rFile = files[r];
      }
      if (l >= r) break;
      id = rFile.id as number;
      rFile.size--;
      lFile.size--;
    }
    checksum += i * id;
  }
  return checksum;
}

export function part2(input: Array<string>) {
  const files = parseDiskFiles(input);
  let r = files.length - 1;
  while (r > 1) {
    if (files[r].id === null) {
      r--;
      continue;
    }
    for (let l = 0; l < r; l++) {
      const lFile = files[l];
      if (lFile.id !== null) continue;
      const rFile = files[r];
      if (lFile.size >= rFile.size) {
        files.splice(r, 1, { id: null, size: rFile.size });
        files.splice(l, 0, rFile);
        lFile.size -= rFile.size;
        break;
      }
    }
    r--;
  }
  return calculateChecksum(files);
}

type File = { id: number | null; size: number };
type DiskFiles = Array<File>;
type Disk = Array<number | ".">;

function parseDiskFiles(input: Array<string>): DiskFiles {
  return input[0].split("").map((size, i) => ({
    id: i % 2 === 0 ? i / 2 : null,
    size: Number(size),
  }));
}

function calculateChecksum(blocks: DiskFiles): number {
  let checksum = 0;
  let blockIndex = 0;
  for (const block of blocks) {
    if (block.id !== null) {
      for (let i = 0; i < block.size; i++) {
        checksum += block.id * blockIndex;
        blockIndex++;
      }
    } else {
      blockIndex += block.size;
    }
  }
  return checksum;
}

if (import.meta.main) {
  console.log(part1(await loadInput(9)));
  console.log(part2(await loadInput(9)));
}
