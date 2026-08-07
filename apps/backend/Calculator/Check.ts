import { availableMemory } from "node:process";
import { Course } from "./Course";
import { Requirement } from "./Requirement";
import { Specialization } from "./Specialization";

let usedCourses : String[] = []
let available : Course[] = [];

export class Check {

    public evaluate(completed : Course[], spec: Specialization) : void { 
        const map = new Map<string, Requirement[]>();

        available = completed;

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
            r.result = this.hasCourse(completed, r.courses[0]);  //single course match
            if (r.result) {
                spec.mandatoryProgress++;
            }
        }

        for (const r of map.get("anyOf")??[]) {

            available = available.filter(c => !usedCourses.includes(c.subject_code + c.course_code));
            r.result = this.anyOf(available, r.courses.map(c => c.subject_code + c.course_code));
             if (r.result) {
                spec.mandatoryProgress++;
            }
        }

        for (const r of map.get("allOf")??[]) {

            available = available.filter(c => !usedCourses.includes(c.subject_code + c.course_code));
            r.result = this.allOf(available, r.courses.map(c => c.subject_code + c.course_code));
            if (r.result) {
                spec.mandatoryProgress++;
            }
        }

         for (const r of map.get("creditAtLeastFrom")??[]) {

            available = available.filter(c => !usedCourses.includes(c.subject_code + c.course_code));
            
            if (typeof r.result === "number" && r.result >= 100) {
                spec.mandatoryProgress++;
            }
        } 

        for (const c of completed) {      //elective courses

            available = available.filter(c => !usedCourses.includes(c.subject_code + c.course_code));
            spec.electiveProgress = this.electiveCount(available) / spec.electiveCredit;
        }
     
        }

    //required courses

     public hasCourse(completed: Course[], course: Course): boolean {

        if (completed.some(c => c.subject_code + c.course_code === course.subject_code + course.course_code)) {
            usedCourses.push(course.subject_code + course.course_code);
            return true;
        }
        return false;


    }

    public anyOf(completed : Course[], courses : String[]) : boolean{
        for (const c of completed) {
            if (courses.includes(c.subject_code + c.course_code)) {
                return true;
            }
        }
        return false;
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

    //Combination

    public creditAtLeastFrom(completed: Course[], filter: { subject?: string[], minLevel?: number}, minCredit: number) : number {
        let count : number = 0;
        for (const c of completed) {
            const level = Number(c.course_code.match(/\d+/)?.[0]);
            
            if (filter.minLevel === undefined || filter.subject?.includes(c.subject_code) 
                && (filter.minLevel === undefined || level >= filter.minLevel) ) {

                count += c.credit;
                usedCourses.push(c.subject_code + c.course_code);

            }
        }
       return Math.round(Math.min(count / minCredit, 1) * 100);
    } //test!!!

    //Elective

     public electiveCount(completed : Course[]) : number {
        let count : number = 0;
        for (const c of completed) {
                count += c.credit;
                usedCourses.push(c.subject_code + c.course_code);
        }
       return count;
    }

}