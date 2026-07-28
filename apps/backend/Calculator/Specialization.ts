import { Course } from "./Course";
import { Check } from "./Check";

export class Specialization {
   
    constructor(
       public readonly name: string,
       public readonly code: string,
       public readonly validityCheck: Check,
       public readonly requirements: Course[],
       public readonly electiveCredit: number
    ){}

    public checkMandatory(course : Course) : boolean {
        return this.validityCheck.findCourse(course, this.requirements);
    }






}

