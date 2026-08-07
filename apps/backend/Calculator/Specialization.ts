import { Course } from "./Course";
import { Check } from "./Check";
import { Requirement } from "./Requirement";

export class Specialization {
   
    constructor(
       public name: string,
       public code: string,
       public requirements: Requirement[],
       public electiveCredit: number,  //total elective credits on the academic calender
    ){}




    





}

