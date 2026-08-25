import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const app = express();
app.use(cors());

const db = new Database("../data/courses.db");


app.get("/api/course", (req, res) => {

   const subject = req.query.subject as string;
    const code = req.query.code as string;


    const course = db.prepare(`
    SELECT *
    FROM courses_frontend
    WHERE subject_code = ?
    AND course_code = ?
    `).get(subject, code);

    res.json(course);
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});