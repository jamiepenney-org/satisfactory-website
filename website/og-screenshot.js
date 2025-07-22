import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import puppeteer from 'puppeteer';
import {createServer} from 'http-server';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(projectRoot, 'public');

const server = createServer({
  root: publicDir,
});

await new Promise((resolve) => fs.cp(path.resolve(projectRoot, 'index.html'), path.resolve(publicDir, '__index.html'), resolve));

await new Promise((resolve) => {
  server.listen(7654, '0.0.0.0', function () {
    resolve()
  });
});

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox"],
  defaultViewport: {
    width: 1200,
    height: 630,
  }
});

const page = await browser.newPage();
// Set the content to our rendered HTML
await page.goto('http://localhost:7654/__index.html', { waitUntil: "domcontentloaded" });

// Wait until all images and fonts have loaded
await page.evaluate(async () => {
  const selectors = Array.from(document.querySelectorAll("img"));
  await Promise.all([
    document.fonts.ready,
    ...selectors.map((img) => {
      // Image has already finished loading, let’s see if it worked
      if (img.complete) {
        // Image loaded and has presence
        if (img.naturalHeight !== 0) return;
        // Image failed, so it has no height
        throw new Error("Image failed to load: " + img.src);
      }
      // Image hasn’t loaded yet, added an event listener to know when it does
      return new Promise((resolve, reject) => {
        img.addEventListener("load", resolve);
        img.addEventListener("error", reject);
      });
    }),
  ]);
});

// Remove the nav bar
await page.$eval("#sidebar", el => el.remove());

const element = await page.$('#main');
await element.screenshot({
  path: path.resolve(publicDir, 'images', 'og.png')
});
await browser.close();

await new Promise((resolve) => fs.rm(path.resolve(publicDir, '__index.html'), resolve));

server.close();
