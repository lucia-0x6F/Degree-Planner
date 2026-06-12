import { readFileSync, writeFileSync } from "fs";

const courses = JSON.parse(readFileSync("courseInfo.json", "utf-8"));
const map = new Map();
for (const c of courses) {
  if (!map.has(c.subject_code)) map.set(c.subject_code, c.faculty);
}

const subjects = [...map].map(([code, faculty]) => ({ code, faculty }));
writeFileSync("subjects.json", JSON.stringify(subjects, null, 2));
console.log(`${subjects.length} subjects`);