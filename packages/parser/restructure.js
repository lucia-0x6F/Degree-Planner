import fs from 'fs';
import path from 'path';

const courses = JSON.parse(fs.readFileSync('packages/scraper/courses.json', 'utf-8'));

const grouped = {};
for (const course of courses) {
  const { faculty, subject_code } = course;
  (grouped[faculty] ??= {})[subject_code] ??= {};
  grouped[faculty][subject_code][`${subject_code} ${course.course_code}`] = course;
}

for (const [faculty, subjects] of Object.entries(grouped)) {
  const dir = path.join('data', faculty);
  fs.mkdirSync(dir, { recursive: true });
  for (const [subject, data] of Object.entries(subjects)) {
    fs.writeFileSync(path.join(dir, `${subject}.json`), JSON.stringify(data, null, 2));
  }
}