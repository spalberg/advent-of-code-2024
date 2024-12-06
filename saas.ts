import { days } from "./days/mod.ts";
import denoJson from "./deno.json" with { type: "json" };
import { getLines } from "./utils/getLines.ts";

export default {
  async fetch(req) {
    const url = new URL(req.url);
    url.pathname = url.pathname.replace(/\/$/, "");
    console.debug(`Request for ${url.pathname}`);

    if (url.pathname === "/info") {
      return new Response(
        json({
          name: "Advent of Code 2024",
          description: "Solutions to Advent of Code 2024",
          version: denoJson.version,
          author: "spalberg",
          source: "https://github.com/spalberg/advent-of-code-2024",
        }),
        jsonHeaders,
      );
    }

    if (url.pathname === "/days") {
      return new Response(
        json({
          days: Array.from(days.keys()),
        }),
        jsonHeaders,
      );
    }

    const match = daysPattern.exec(url);
    if (match != null) {
      if (req.method !== "POST") {
        return new Response(json({ error: "only POST shall pass" }), {
          status: 405,
          ...jsonHeaders,
        });
      }
      const input = req.body != null ? await getLines(req.body) : [];
      if (input.length === 0) {
        return new Response(
          json({ error: "you need to send some input data" }),
          {
            status: 422,
            ...jsonHeaders,
          },
        );
      }

      const num = parseInt(match.pathname.groups.num ?? "", 10);
      const day = days.get(num);
      if (day == null) {
        return new Response(null, { status: 404 });
      }
      console.log(`Processing day ${num}`);
      return new Response(
        json({ day: num, part1: day.part1(input), part2: day.part2(input) }),
        jsonHeaders,
      );
    }

    return new Response(null, { status: 404 });
  },
} satisfies Deno.ServeDefaultExport;

const daysPattern = new URLPattern({ pathname: "/days/:num" });

const jsonHeaders = {
  headers: { "Content-Type": "application/json" },
};

function json(data: unknown) {
  return JSON.stringify(data, null, 2);
}
