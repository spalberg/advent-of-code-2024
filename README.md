# Advent of Code 2024

[![JSR](https://jsr.io/badges/@aoc/2024)](https://jsr.io/@aoc/2024)

Welcome to the [Advent of Code 2024](https://adventofcode.com/2024)! This
repository is where the magic happens, with all solutions written in TypeScript
and running on Deno – the best anagram of Node! Dive into the daily challenges
and explore the code. Happy coding and may your algorithms be ever efficient!

## CLI

You don't have to check out this repository to test my code against your inputs!
Simply run the published cli via JSR:

```bash
deno run -R -r="jsr:@aoc/2024" jsr:@aoc/2024 --help
```

or directly with day and input:

```bash
deno run -R -r="jsr:@aoc/2024" jsr:@aoc/2024 -d 2 -i ./inputs/2.txt
```

The `-r="jsr:@aoc/2024"` flag is necessary to get the latest version every time.
