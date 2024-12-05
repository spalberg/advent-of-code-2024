# Advent of Code 2024

[![JSR](https://jsr.io/badges/@aoc/2024)](https://jsr.io/@aoc/2024)

Welcome to the [Advent of Code 2024](https://adventofcode.com/2024)! This
repository is where the magic happens, with all solutions written in TypeScript
and running on Deno – the best anagram of Node! Dive into the daily challenges
and explore the code. Happy coding and may your algorithms be ever efficient!

## CLI

You don't have to check out this repository to test my code against your inputs!
Simply run the published cli via JSR.

Usage:

```bash
# To list all options
deno run jsr:@aoc/2024 --help
# To use the interactive cli
deno run -RN jsr:@aoc/2024
# To directly execute a day with a local input file
deno run -R jsr:@aoc/2024 -d 2 -i ./inputs/2.txt
# To directly execute a day with a remote input file
deno run -RN jsr:@aoc/2024 -d 2 -i https://pastebin.com/your-input
# To pipe the input into the cli
cat ./inputs/2.txt | deno run jsr:@aoc/2024 -d 2
```

> [!TIP]
> Deno caches jsr packages, so there might be new solutions already but your cli
> version is out of date. Simply run `deno run -A jsr:@aoc/2024 update` to
> update to the latest version.
