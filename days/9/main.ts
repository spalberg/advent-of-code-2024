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

export function part2(_input: Array<string>) {
}

type Disk = Array<number | ".">;

function parseDiskMap(input: Array<string>): Array<number> {
  return input[0].split("").map(Number);
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

if (import.meta.main) {
  console.log(part1(await loadInput(9)));
  console.log(part2(await loadInput(9)));
}
