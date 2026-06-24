// validateAst.js
// node validateAst.js ../../data/courses_processed

import fs from "fs";
import path from "path";

const VALID_TYPES = new Set([
  "course",
  "and",
  "or",
  "min_grade",
  "credits_from",
  "standing",
  "unknown",
]);

const COURSE_CODE_RE = /^[A-Z]{2,6} \d{3}[A-Z]?$/;

// ── per-node validation ──────────────────────────────────────────────────────

function validateNode(node, path) {
  const errors = [];

  if (node === null || typeof node !== "object") {
    errors.push(`${path}: expected object, got ${JSON.stringify(node)}`);
    return errors;
  }

  if (!node.type) {
    errors.push(`${path}: missing 'type'`);
    return errors;
  }

  if (!VALID_TYPES.has(node.type)) {
    errors.push(`${path}: unknown type '${node.type}'`);
    return errors;
  }

  switch (node.type) {
    case "course":
      if (!node.code) {
        errors.push(`${path}: 'course' node missing 'code'`);
      } else if (!COURSE_CODE_RE.test(node.code)) {
        errors.push(`${path}: invalid course code '${node.code}'`);
      }
      break;

    case "and":
    case "or":
      if (!Array.isArray(node.items) || node.items.length === 0) {
        errors.push(`${path}: '${node.type}' node missing or empty 'items'`);
      } else {
        node.items.forEach((child, i) =>
          errors.push(...validateNode(child, `${path}.items[${i}]`))
        );
      }
      break;

    case "min_grade":
      if (!node.code) errors.push(`${path}: 'min_grade' missing 'code'`);
      if (node.min_percent === undefined && node.grade === undefined)
        errors.push(`${path}: 'min_grade' missing grade value`);
      break;

    case "credits_from":
      if (node.min_credits === undefined) errors.push(`${path}: 'credits_from' missing 'min_credits'`);
      if (node.courses !== undefined && !Array.isArray(node.courses)) {
        errors.push(`${path}: 'credits_from.courses' should be an array`);
      }
      break;

    case "standing":
      if (node.min_year === undefined) errors.push(`${path}: 'standing' missing 'min_year'`);
      break;

    case "unknown":
      if (!node.raw) errors.push(`${path}: 'unknown' node missing 'raw'`);
      break;
  }

  return errors;
}

// ── per-file validation ──────────────────────────────────────────────────────

function validateFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    return { parseError: e.message, courses: {} };
  }

  const results = {};
  for (const [courseCode, entry] of Object.entries(data)) {
    const errors = [];
    const stats = { hasUnknown: false, unknownNodes: [] };

    for (const field of ["prereq", "coreq"]) {
      const node = entry[field];
      if (node === null || node === undefined) continue;
      const fieldErrors = validateNode(node, `${courseCode}.${field}`);
      errors.push(...fieldErrors);

      // collect unknown nodes
      collectUnknown(node, `${courseCode}.${field}`, stats);
    }

    if (errors.length > 0 || stats.hasUnknown) {
      results[courseCode] = { errors, ...stats };
    }
  }

  return { parseError: null, courses: results, total: Object.keys(data).length };
}

function collectUnknown(node, path, stats) {
  if (!node || typeof node !== "object") return;
  if (node.type === "unknown") {
    stats.hasUnknown = true;
    stats.unknownNodes.push({ path, raw: node.raw });
    return;
  }
  if (Array.isArray(node.items)) {
    node.items.forEach((child, i) =>
      collectUnknown(child, `${path}.items[${i}]`, stats)
    );
  }
}

// ── main ─────────────────────────────────────────────────────────────────────

function run(baseDir) {
  const faculties = fs.readdirSync(baseDir).filter((f) =>
    fs.statSync(path.join(baseDir, f)).isDirectory()
  );

  const report = {
    summary: {
      totalFiles: 0,
      totalCourses: 0,
      coursesWithErrors: 0,
      coursesWithUnknown: 0,
      parseErrors: 0,
    },
    byFaculty: {},
    unknownSample: [],   // up to 20 unknown nodes for quick review
  };

  for (const faculty of faculties) {
    const facultyDir = path.join(baseDir, faculty);
    const files = fs
      .readdirSync(facultyDir)
      .filter((f) => f.endsWith(".json"));

    const facultyStats = {
      files: files.length,
      courses: 0,
      coursesWithErrors: 0,
      coursesWithUnknown: 0,
      parseErrors: 0,
      details: {},
    };

    for (const file of files) {
      const filePath = path.join(facultyDir, file);
      const { parseError, courses, total } = validateFile(filePath);
      report.summary.totalFiles++;

      if (parseError) {
        facultyStats.parseErrors++;
        report.summary.parseErrors++;
        facultyStats.details[file] = { parseError };
        continue;
      }

      facultyStats.courses += total;
      report.summary.totalCourses += total;

      const problemCourses = Object.keys(courses);
      if (problemCourses.length > 0) {
        facultyStats.details[file] = courses;
        for (const [code, info] of Object.entries(courses)) {
          if (info.errors.length > 0) {
            facultyStats.coursesWithErrors++;
            report.summary.coursesWithErrors++;
          }
          if (info.hasUnknown) {
            facultyStats.coursesWithUnknown++;
            report.summary.coursesWithUnknown++;
            // collect sample unknown nodes
            if (report.unknownSample.length < 20) {
              report.unknownSample.push(
                ...info.unknownNodes.map((n) => ({ course: code, ...n }))
              );
            }
          }
        }
      }
    }

    report.byFaculty[faculty] = facultyStats;
  }

  return report;
}

function printReport(report) {
  const { summary } = report;

  console.log("  AST Validation Report");
  console.log(`  files scanned    : ${summary.totalFiles}`);
  console.log(`  total courses    : ${summary.totalCourses}`);
  console.log(`  parse errors     : ${summary.parseErrors}`);
  console.log(
    `  courses w/ errors: ${summary.coursesWithErrors} (${pct(summary.coursesWithErrors, summary.totalCourses)})`
  );
  console.log(
    `  courses w/ unknown: ${summary.coursesWithUnknown} (${pct(summary.coursesWithUnknown, summary.totalCourses)})`
  );

  console.log("── by faculty ──────────────────────────");
  for (const [faculty, stats] of Object.entries(report.byFaculty)) {
    if (stats.coursesWithErrors > 0 || stats.coursesWithUnknown > 0 || stats.parseErrors > 0) {
      console.log(
        `  ${faculty.padEnd(30)} errors: ${String(stats.coursesWithErrors).padStart(3)}  unknown: ${String(stats.coursesWithUnknown).padStart(3)}`
      );
    }
  }

  if (report.unknownSample.length > 0) {
    console.log("\n── unknown node sample (first 20) ──────");
    for (const n of report.unknownSample) {
      console.log(`  [${n.course}] ${n.path}`);
      console.log(`    → ${n.raw}`);
    }
  }

  console.log();
}

function pct(n, total) {
  if (total === 0) return "0%";
  return ((n / total) * 100).toFixed(1) + "%";
}

// ── entry ────────────────────────────────────────────────────────────────────

const baseDir = process.argv[2];
if (!baseDir) {
  console.error("usage: node validateAst.js <path_to_courses_processed>");
  process.exit(1);
}

const report = run(path.resolve(baseDir));
printReport(report);

// write full report to json for deeper inspection
const outPath = path.join(process.cwd(), "validation_report.json");
fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
console.log(`full report written to ${outPath}\n`);