import { cpSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const output = resolve("dist");
const pages = [
  "index.html",
  "menu.html",
  "about.html",
  "events.html",
  "gallery.html",
  "contact.html",
  "placeholder.html",
  "robots.txt",
  "sitemap.xml",
];

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const page of pages) {
  cpSync(page, resolve(output, page));
}

cpSync(resolve("assets"), resolve(output, "assets"), { recursive: true });
