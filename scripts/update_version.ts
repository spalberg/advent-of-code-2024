import { resolve } from "@std/path";
import { format, increment, parse, type ReleaseType } from "@std/semver";
import { EOL } from "node:os";
import denoJson from "../deno.json" with { type: "json" };

const release = Deno.args[0];
if (release == null) {
  console.error("Please provide a release type");
  Deno.exit(1);
}
const version = denoJson.version as string;
const parsed = parse(version);
const newVersion = increment(parsed, release as ReleaseType);
denoJson.version = format(newVersion);
console.log(`Bumping version from ${version} to ${denoJson.version}`);
const json = JSON.stringify(denoJson, null, 2);
Deno.writeTextFileSync(resolve(import.meta.dirname!, "../deno.json"), json);
console.log("Updated deno.json");
const ghOutput = Deno.env.get("GITHUB_OUTPUT");
if (ghOutput != null) {
  const out = `version=${denoJson.version}`;
  Deno.writeTextFileSync(ghOutput, out + EOL, { append: true });
  console.log("Updated GITHUB_OUTPUT");
}
