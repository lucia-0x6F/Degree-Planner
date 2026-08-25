import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { Course } from '../backend/Calculator/Course';

const DB_PATH = path.join(process.cwd(), 'data', 'courses.db');

const db = new Database(DB_PATH);

// raw: data/courses，processed: data/courses_processed
db.exec(`
  CREATE TABLE IF NOT EXISTS courses_raw (
    full_code TEXT PRIMARY KEY,
    subject_code TEXT,
    course_code TEXT,
    credit TEXT,
    course_name TEXT,
    faculty TEXT,
    description TEXT
  );
`);

function importDir(baseDir: string, tableName: string) {
  const insert = db.prepare(
    `INSERT OR REPLACE INTO ${tableName} VALUES (?, ?, ?, ?, ?, ?, ?)`
  );

  const insertAll = db.transaction((entries: [string, Course][]) => {
    for (const [code, c] of entries) {
      insert.run(
        code,
        c.subject_code || '',
        c.course_code || '',
        c.credit || '',
        c.course_name || '',
        c.faculty || '',
        c.description || ''
      );
    }
  });

  // read json
  let totalCourses = 0;

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.json')) {
        const raw = fs.readFileSync(fullPath, 'utf-8');
        const data = JSON.parse(raw);
        insertAll(Object.entries(data));
        const fileCount = Object.keys(data).length;
        totalCourses += fileCount;
        console.log(`[${tableName}] import ${path.relative(baseDir, fullPath)}: ${fileCount} courses`);
      }
    }
  }

  walk(baseDir);
  console.log(`[${tableName}] total courses: ${totalCourses}`);
}

// output
const rawDir = path.join(process.cwd(), 'data', 'courses');

if (fs.existsSync(rawDir)) importDir(rawDir, 'courses_raw');

// statistics
const rawCount = db.prepare('SELECT COUNT(*) AS cnt FROM courses_raw').get() as Course;
console.log(`Database: courses_raw = ${rawCount.cnt}`);

db.close();
console.log('Completed');