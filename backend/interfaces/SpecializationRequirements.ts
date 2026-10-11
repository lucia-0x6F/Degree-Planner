export type RequirementType =
    | "hasCourse"
    | "anyOf"
    | "allOf"
    | "creditAtLeastFrom";

export interface CreditFilter {
    subject: string[];
    minLevel: number;
}

export interface SpecializationRequirement {
    type: RequirementType;
    courses: string[];
    required: boolean | number;
    minimumCredits?: number;
    filter?: CreditFilter;
}

export interface SpecializationConfig {
    name: string;
    code: string;
    requirements: SpecializationRequirement[];
    electiveCredit: number;
}