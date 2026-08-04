import { Course } from "./Course";
import { Requirement } from "./Requirement";

export class Check {

    public evaluate(completed : Course[], r: Requirement) { 

        if (r.type == undefined) {

        } else if (r.type == "anyOf") {

        } else if (r.type == "allOf") {
            
        } else if (r.type == "creditAtLeastFrom") {
            
        } else {
            
        }
    }
     
    

    //required courses

     public hasCourse(completed: Course[], course: Course): boolean {
        return completed.some(c => c.subject_code + c.course_code === course.subject_code + course.course_code);
    }

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


    //progress tracker

    public numberProgress(completed : Course[], courses : String[], minNumber : number) : number {
        let count : number = 0;
        for (const c of completed) {
            if (courses.includes(c.subject_code + c.course_code)) {
                count++;
            }
        }
       return Math.round(Math.min(count / minNumber, 1) * 100);
    }

     public creditProgress(completed : Course[], courses : String[], minCredit : number) : number {
        let count : number = 0;
        for (const c of completed) {
            if (courses.includes(c.subject_code + c.course_code)) {
                count += c.credit;
            }
        }
       return Math.round(Math.min(count / minCredit, 1) * 100);
    }

    //Combination

    public creditAtLeastFrom(completed: Course[], filter: { subject?: string[], minLevel?: number}, minCredit: number) {
        let count : number = 0;
        for (const c of completed) {
            const level = Number(c.course_code.match(/\d+/)?.[0]);
            
            if (filter.minLevel === undefined || filter.subject?.includes(c.subject_code) 
                && (filter.minLevel === undefined || level >= filter.minLevel) ) {

                count += c.credit;

            }
        }
       return Math.round(Math.min(count / minCredit, 1) * 100);
    } //test!!!

}