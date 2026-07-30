import { Course } from "./Course";

export class Check {

    public anyOf(completed : Course[], courses : String[]) : boolean{
        return completed.some(c => courses.includes(c.subject_code + c.course_code));
    }

    public allOf(completed : Course[], courses : String[]) : boolean{
        let count : number = 0;
        for (const c of completed) {
            if (courses.includes(c.subject_code + c.course_code)) {
                count++;
            }
        }
        return count >= courses.length ? true : false;
    }

    public numberProgress(completed : Course[], courses : String[], minNumber : number) : string {
        let count : number = 0;
        for (const c of completed) {
            if (courses.includes(c.subject_code + c.course_code)) {
                count++;
            }
        }
       return String(Math.round(Math.min(count / minNumber, 1) * 100)) + "%";
    }

    public creditProgress(completed : Course[], courses : String[], minCredit : number) : string {
        let count : number = 0;
        for (const c of completed) {
            if (courses.includes(c.subject_code + c.course_code)) {
                count += c.credit;
            }
        }
       return String(Math.round(Math.min(count / minCredit, 1) * 100)) + "%";
    }

    public findCourse(course : Course, courses : String[]) : boolean {
         for (const c of courses) {
            if (courses.includes(course.subject_code + course.course_code)) {
                return true;
            }
        }
        return false;
    }

}