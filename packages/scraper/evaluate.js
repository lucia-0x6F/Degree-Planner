import { readFileSync } from "fs";
const courses = JSON.parse(readFileSync("courses.json", "utf-8"));
const subjects_web = new Set(courses.map(c => c.subject_code));
console.log(`Total course number: ${courses.length}`);
console.log(`Total subject number: ${subjects_web.size}`);

const subjects_file = new Set(courses.map(c => c.subject_code));
console.log(`Total course number: ${courses.length}`);
console.log(`Total subject number: ${subjects_file.size}`);