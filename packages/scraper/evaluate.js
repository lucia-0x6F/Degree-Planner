import { readFileSync } from "fs";
const courses = JSON.parse(readFileSync("courseInfo.json", "utf-8"));
const subjects = new Set(courses.map(c => c.subject_code));
console.log(`Total course number: ${courses.length}`);
console.log(`Total subject number: ${subjects.size}`);