import { Course } from "./Course";

export class Check {

    public anyOf(completed : Course[], courses : String[]) : boolean{
        return completed.some(c => courses.includes(c.course_name));
    }

    public allOf(completed : Course[], courses : String[]) : boolean{
        let count : number = 0;
        for (const c of completed) {
            if (courses.includes(c.course_name)) {
                count++;
            }
        }
        return count >= courses.length ? true : false;
    }

    public numberProgress(completed : Course[], courses : String[], minNumber : number) : string {
        let count : number = 0;
        for (const c of completed) {
            if (courses.includes(c.course_name)) {
                count++;
            }
        }
       return String(count / minNumber * 100) + "%";
    }

    public creditProgress(completed : Course[], courses : String[], minCredit : number) : string {
        let count : number = 0;
        for (const c of completed) {
            if (courses.includes(c.course_name)) {
                count += c.credit;
            }
        }
       return String(count / minCredit * 100) + "%";
    }


}