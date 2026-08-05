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
        public filter: {
            subject?: string[],
            minLevel?: number
        },
        public result: boolean | number
    ) {}
   

}