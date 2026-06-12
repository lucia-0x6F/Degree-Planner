/*
 npm init -y && npm i playwright
 npx playwright install chromium
 node course_scraper.js UBCV_subjects.json courseInfo.json
 */

import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "fs";

const BASE_URL = "https://vancouver.calendar.ubc.ca/course-descriptions/subject/";
const DELAY_MS = 800;
const TIMEOUT  = 15_000;

const [inputPath = "UBCV_subjects.json", outputPath = "courseInfo.json"] = process.argv.slice(2);

const raw = JSON.parse(readFileSync(inputPath, "utf-8"));
const subjects = Array.isArray(raw) ? raw : Object.values(raw).find(Array.isArray);
const codes = subjects.map((s) => s.code);
console.log(`extracted ${codes.length} subject codes\n`);

// extract courses
function extractCourses() {
  const results = [];
  for (const li of document.querySelectorAll("ol > li")) {
    const h3 = li.querySelector("h3");
    if (!h3) continue;

    const heading = h3.textContent.trim();
    const content = li.textContent.trim();
    const index = content.indexOf(heading);
    const text = index >= 0 ? content.slice(index + heading.length).trim() : "";

    results.push({ heading, text });
  }
  return results;
}

// title parser
const TITLE = /^(\w+)_V\s+(\d+)\s+\((\d+(?:-\d+)?)\)\s+(.+)$/; 

function parseHeading(heading, subjectCode) {
  const result = heading.match(TITLE);
  if (!result) return null;
  return {
    subject_code: subjectCode,
    course_code: `${result[1]} ${result[2]}`,
    credit: result[3],
    course_name: result[4].trim(),
  };
}

// For each subject code → navigate to page → wait for JS render →
// extract DOM in browser → parse with regex in Node → store results →
// sleep → next code

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const allCourses = [];
const failed = [];

for (let i = 0; i < codes.length; i++) {
  const code = codes[i];
  const url = BASE_URL + code.toLowerCase() + "v";
  process.stdout.write(`[${i + 1}/${codes.length}] ${code} ... `);

  try {
    await page.goto(url, { timeout: TIMEOUT });
    await page.waitForSelector("ol li", { timeout: TIMEOUT });

    const rawContent = await page.evaluate(extractCourses);

    let count = 0;
    for (const { heading, text } of rawContent) {
        const parsed = parseHeading(heading, code);
        if (parsed) {
            allCourses.push({ ...parsed, description: text });
            count++;
        }
    }
    console.log(`${count} courses`);
  } catch (e) {
    console.log(`fail (${e.message.slice(0, 60)})`);
    failed.push(code);
  }

  await new Promise((r) => setTimeout(r, DELAY_MS));
}

await browser.close();

// output
writeFileSync(outputPath, JSON.stringify(allCourses, null, 2));
console.log(`\nCompleted! There are ${allCourses.length} courses in all. → ${outputPath}`);
if (failed.length) console.log(`Failed codes: ${failed.join(", ")}`);