# Advent of Code 2024

[![JSR](https://jsr.io/badges/@aoc/2024)](https://jsr.io/@aoc/2024)

Welcome to the [Advent of Code 2024](https://adventofcode.com/2024)! This
repository is where the magic happens, with all solutions written in TypeScript
and running on Deno – the best anagram of Node! Dive into the daily challenges
and explore the code. Happy coding and may your algorithms be ever efficient!

## CLI

You don't have to check out this repository to test my code against your inputs!
Simply run the published cli via [JSR](https://jsr.io/).

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

## SaaS (Solutions as a Service)

_You don't have deno installed and just want to get some solutions for your
puzzle inputs?_\
_SaaS_ is the future and here to save you!

All solutions are available as an API, powered by
[Deno Deploy](https://deno.com/deploy).

### _Almost OpenAPI_ ™ Spec:

Use one of these base urls:
[`https://aoc-2024.palberg.de`](https://aoc-2024.palberg.de/info) or
[`https://aoc-2024.deno.dev`](https://aoc-2024.deno.dev/info).

- `POST /days/:number`: send your raw input as body to get the results
- `GET /info`: get some nice infos
- `GET /days`: see what days are available

### Examples

If you have access to `curl` you can adopt the following example for your
usecase:

```bash
curl -X POST --data-binary @./inputs/1.txt https://aoc-2024.palberg.de/days/1
```

If you are more of a power (_shell_) user the following example might be a
better starting point for you:

```pswh
irm -method "post" https://aoc-2024.palberg.de/days/2 -Body (gc -raw ./inputs/2.txt)
```
