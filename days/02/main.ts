import { loadInput } from "utils";

export function part1(input: Array<string>) {
  const reports = parseReports(input);
  const safeReports = reports.filter(isReportSafe);
  return safeReports.length;
}

export function part2(input: Array<string>) {
  const reports = parseReports(input);
  const safeReports = reports.filter((r) =>
    isReportSafe(r) || isDampenedReportSafe(r)
  );
  return safeReports.length;
}

function parseReports(input: Array<string>) {
  return input.map((l) => l.split(" ").map(Number));
}

function isReportSafe(report: Array<number>) {
  if (report.length < 2) return true;
  const direction = report[0] - report[1] > 0 ? -1 : 1;
  for (let i = 1; i < report.length; i += 1) {
    const diff = (report[i - 1] - report[i]) * -direction;
    if (diff < 1 || diff > 3) return false;
  }
  return true;
}

function isDampenedReportSafe(report: Array<number>) {
  return report.map((_, i) => report.toSpliced(i, 1)).some(isReportSafe);
}

if (import.meta.main) {
  console.log(part1(await loadInput(2)));
  console.log(part2(await loadInput(2)));
}
