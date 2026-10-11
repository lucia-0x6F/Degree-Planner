export interface DegreeRequirements {
    degreeName: string;
    degreeCode: string;
    totalCredits: number;
    requirements: DegreeRequirement[];
}

export interface DegreeRequirement {
    id: string;
    type: string;
    name: string;
    description: string;
    parameters?: Record<string, unknown>;
}