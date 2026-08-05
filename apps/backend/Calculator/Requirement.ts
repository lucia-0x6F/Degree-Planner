import { Course } from "./Course";

 export type RequirementType =
    | "hasCourse"
    | "allOf"
    | "anyOf"
    | "creditAtLeastFrom";

export class Requirement {
    constructor(
        public type: RequirementType,
        public courses: Course[],
        public result: boolean | number,
        public filter?: {
            subject?: string[],
            minLevel?: number
        }
    ) {}
   

}