import Database from "better-sqlite3";
import { Course } from "../backend/models/Course";

export class CourseQuery {

    constructor(private db: Database.Database) {}

    public getCourse(subject: string, code: string): Course {
        return this.db.prepare(
            `
            SELECT *
            FROM courses_frontend
            WHERE subject_code = ?
            AND course_code = ?
            `
        ).get(subject, code) as Course;
    }
}