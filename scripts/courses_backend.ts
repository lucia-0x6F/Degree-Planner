import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'courses.db');

const db = new Database(DB_PATH);


db.exec(`
  CREATE TABLE IF NOT EXISTS courses_processed (
    full_code TEXT PRIMARY KEY,
    prereq TEXT,
    coreq TEXT
  );
`);


function importProcessedDir(baseDir: string) {

  const insert = db.prepare(
    `
    INSERT OR REPLACE INTO courses_processed
    VALUES (?, ?, ?)
    `
  );


  const insertAll = db.transaction((entries: [string, any][]) => {

    for (const [code, course] of entries) {

      insert.run(
        code,
        course.prereq ? JSON.stringify(course.prereq) : null,
        course.coreq ? JSON.stringify(course.coreq) : null
      );

    }

  });


  let totalCourses = 0;


  function walk(dir: string) {

    const entries = fs.readdirSync(dir, {
      withFileTypes: true
    });


    for (const entry of entries) {

      const fullPath = path.join(dir, entry.name);


      if (entry.isDirectory()) {

        walk(fullPath);

      } else if (entry.name.endsWith('.json')) {

        const raw = fs.readFileSync(
          fullPath,
          'utf-8'
        );

        const data = JSON.parse(raw);


        insertAll(Object.entries(data));


        const count = Object.keys(data).length;

        totalCourses += count;


        console.log(
          `[courses_processed] import ${path.relative(baseDir, fullPath)}: ${count} courses`
        );

      }
    }
  }


  walk(baseDir);


  console.log(
    `[courses_processed] total courses: ${totalCourses}`
  );
}


const processedDir = path.join(
  process.cwd(),
  'data',
  'courses_processed'
);


if (fs.existsSync(processedDir)) {
  importProcessedDir(processedDir);
}


const count = db
  .prepare(
    'SELECT COUNT(*) AS cnt FROM courses_processed'
  )
  .get() as { cnt:number };


console.log(
  `Database courses_processed = ${count.cnt}`
);


db.close();

console.log('courses_processed import completed');