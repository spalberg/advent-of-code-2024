import { loadInput } from "utils";

export function part1(input: Array<string>) {
  const diskMap = parseDiskMap(input);
  const disk = expandDiskMap(diskMap);
  let l = 0;
  let r = disk.length - 1;
  while (l < r) {
    while (disk[l] !== ".") {
      l++;
    }
    while (disk[r] === ".") {
      r--;
    }
    while (disk[r] !== "." && disk[l] === "." && l < r) {
      disk[l] = disk[r];
      l++;
      r--;
    }
  }
  return calculateChecksum(disk, r + 1);
}

export function part2(input: Array<string>) {
  const files = parseDiskFiles(input);
  //   printDisk(files);
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
        // printDisk(files);
        break;
      }
    }
    r--;
  }
  //   console.log("---");
  //   const d = toDisk(files);
  //   console.log(d);
  //   console.log("00992111777.44.333....5555.6666.....8888..");
  //   console.log(d === "00992111777.44.333....5555.6666.....8888..");
  return calculateChecksumAlt(files);
}

type File = { id: number | null; size: number };
type DiskFiles = Array<File>;
type Disk = Array<number | ".">;

function parseDiskMap(input: Array<string>): Array<number> {
  return input[0].split("").map(Number);
}

function parseDiskFiles(input: Array<string>): DiskFiles {
  return input[0].split("").map((size, i) => ({
    id: i % 2 === 0 ? i / 2 : null,
    size: Number(size),
  }));
}

function expandDiskMap(diskMap: Array<number>): Disk {
  const expandedSize = diskMap.reduce((a, b) => a + b);
  const disk = new Array(expandedSize).fill(null);
  let diskIndex = 0;
  for (let i = 0; i < diskMap.length; i++) {
    const length = diskMap[i];
    const value = i % 2 === 0 ? i / 2 : ".";
    for (let j = 0; j < length; j++) {
      disk[diskIndex] = value;
      diskIndex++;
    }
  }
  return disk;
}

function calculateChecksum(disk: Disk, length = disk.length): number {
  let checksum = 0;
  for (let i = 0; i < length; i++) {
    const block = disk[i];
    if (block !== ".") {
      checksum += block * i;
    }
  }
  return checksum;
}

function calculateChecksumAlt(blocks: DiskFiles): number {
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

function toDisk(files: DiskFiles) {
  return files.map((file) =>
    (file.id === null ? "." : file.id.toString()).repeat(file.size)
  ).join("");
}

function printDisk(files: DiskFiles) {
  console.log(toDisk(files));
}

if (import.meta.main) {
  console.log(part1(await loadInput(9)));
  console.log(part2(await loadInput(9)));
}

// export function part2FirstTry(input: Array<string>) {
//     const diskMap = parseDiskMap(input);
//     const disk = expandDiskMap(diskMap);
//     let diskOffsetRight = disk.length;
//     for (let r = diskMap.length - 1; r >= 0; r--) {
//       diskOffsetRight -= diskMap[r];
//       if (r % 2 === 1) {
//         continue;
//       }
//       let diskOffsetLeft = 0;
//       for (let l = 0; l < r; l++) {
//         if (l % 2 === 0) {
//           diskOffsetLeft += diskMap[l];
//           continue;
//         }
//         printDisk(diskMap, r, l);
//         printDisk(disk, diskOffsetLeft, diskOffsetRight);
//         console.log("---");
//         if (diskMap[l] >= diskMap[r]) {
//           diskMap[l - 1] += diskMap[r];
//           diskMap[l] -= diskMap[r];
//           disk.fill(
//             disk[diskOffsetRight],
//             diskOffsetLeft,
//             diskOffsetLeft + diskMap[r],
//           );
//           disk.fill(".", diskOffsetRight, diskOffsetRight + diskMap[r]);
//           break;
//         }
//         diskOffsetLeft += diskMap[l];
//       }
//     }
//     return calculateChecksum(disk);
//   }

//   function printDisk(disk: Array<number | string>, ...markers: Array<number>) {
//       console.log(
//         disk.map((n, i) => markers.includes(i) ? colors.yellow(n.toString()) : n)
//           .join(""),
//       );
//     }
