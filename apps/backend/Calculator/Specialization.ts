import { Course } from "./Course";
import { Check } from "./Check";

export class Specialization {
    constructor(
       public readonly name: string,
       public readonly code: string,
       public readonly requirements: Check[],
       public readonly electiveCredit: number
    ){}






}

