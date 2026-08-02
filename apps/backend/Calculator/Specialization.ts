import { Course } from "./Course";
import { Check } from "./Check";

export class Specialization {
   
    constructor(
       public name: string,
       public code: string,
       public validityCheck: Check,
       public requirements: String[],
       public electiveCredit: number
    ){}

    public checkMandatory(course : Course) : boolean {
        return this.validityCheck.findCourse(course, this.requirements);  
    }






}

