
import { Course } from "../models/Course";
import { Requirement } from "../models/Requirement";
import { Specialization } from "../models/Specialization";



export class Check {

    constructor(
            public usedCourses : string[] = [],
            public mandatoryCount: number = 0,  //mandatory requirements that have been finished
            public electiveProgress: number = 0  //elective credits that have been finished
        ) {}

    public evaluate(completed : Course[], spec: Specialization) : void { 
        const map = new Map<string, Requirement[]>();

        let available : Course[] = completed;

        for (const r of spec.requirements) {
            const list = map.get(r.type);
                if (list) {
                    list.push(r);
                } else {
                   const arr: Requirement[] = [];
                    arr.push(r);
                    map.set(r.type, arr);
                }
        }


        for (const r of map.get("hasCourse")??[]) {
            available = available.filter(c => !this.usedCourses.includes(c.subject_code + c.course_code));
            r.result = this.hasCourse(completed, r.courses[0]);  //single course match
            if (r.result) {
                this.mandatoryCount++;
            }
        }

        for (const r of map.get("anyOf")??[]) {

            available = available.filter(c => !this.usedCourses.includes(c.subject_code + c.course_code));
            r.result = this.anyOf(available, r.courses.map(c => c.subject_code + c.course_code));
             if (r.result) {
                this.mandatoryCount++;
            }
        }

        for (const r of map.get("allOf")??[]) {

            available = available.filter(c => !this.usedCourses.includes(c.subject_code + c.course_code));
            r.result = this.allOf(available, r.courses.map(c => c.subject_code + c.course_code));
            if (r.result) {
                this.mandatoryCount++;
            }
        }

         for (const r of map.get("creditAtLeastFrom")??[]) {

            available = available.filter(c => !this.usedCourses.includes(c.subject_code + c.course_code));
            
            r.result = this.creditAtLeastFrom(available, r.filter??{}, r.minCredit??0);

            if (typeof r.result === "number" && r.result >= 1) {
                this.mandatoryCount++;
            }
        } 
            available = available.filter(c => !this.usedCourses.includes(c.subject_code + c.course_code));
            this.electiveCount(available);  //elective courses
        
     
        }

    //required courses

     public hasCourse(completed: Course[], course: Course): boolean {

        if (completed.some(c => c.subject_code + c.course_code === course.subject_code + course.course_code)) {
            this.usedCourses.push(course.subject_code + course.course_code);
            return true;
        }
        return false;


    }

    public anyOf(completed : Course[], courses : string[]) : boolean{
        for (const c of completed) {
            if (courses.includes(c.subject_code + c.course_code)) {
                this.usedCourses.push(c.subject_code + c.course_code);
                return true;
            }
        }
        return false;
    }

    public allOf(completed : Course[], courses : string[]) : boolean{
        let count : number = 0;
        for (const c of completed) {
            if (courses.includes(c.subject_code + c.course_code)) {
                count++;
                this.usedCourses.push(c.subject_code + c.course_code);
            }
        }
        return count >= courses.length ? true : false;
    }

    //Combination

    public creditAtLeastFrom(completed: Course[], filter: { subject?: string[], minLevel?: number}, minCredit: number) : number {
        let count : number = 0;
        for (const c of completed) {
            const level = Number(c.course_code.match(/\d+/)?.[0]);
            
            if (filter.minLevel === undefined || filter.subject?.includes(c.subject_code) 
                && (filter.minLevel === undefined || level >= filter.minLevel) ) {

                count += c.credit;
                this.usedCourses.push(c.subject_code + c.course_code);

            }
        }
       return Number(Math.min(count / minCredit, 1).toFixed(2));
    } 

    //Elective

     public electiveCount(completed : Course[]) : void {
        for (const c of completed) {
                this.electiveProgress += Number(c.credit);
                //console.log(typeof this.electiveProgress);

                this.usedCourses.push(c.subject_code + c.course_code);
        }
    }

}