import { Course } from "./Course";

 export type RequirementType =
    | "hasCourse"
    | "allOf"
    | "anyOf"
    | "creditAtLeastFrom"
    | "creditAtLeast";

export class Requirement {
    constructor(
        public type: RequirementType,
        public courses: Course[],
        public filter?: {
            subject?: string[],
            minLevel?: number
        },
        public minCredits?: number
    ) {}
   

}