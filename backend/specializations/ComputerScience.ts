import type { SpecializationConfig } from "../interfaces/SpecializationRequirements";

export const CSRequirements: SpecializationConfig = {
    name: "Computer Science",
    code: "0376",
    electiveCredit: 52,

    requirements: [
        {
            type: "hasCourse",
            courses: ["SCIE 113"],
            required: true,
        },
        {
            type: "hasCourse",
            courses: ["CPSC 110"],
            required: true,
        },
        {
            type: "hasCourse",
            courses: ["CPSC 121"],
            required: true,
        },
        {
            type: "anyOf",
            courses: [
                "MATH 100",
                "MATH 102",
                "MATH 104",
                "MATH 110",
                "MATH 120",
                "MATH 180",
                "MATH 184",
            ],
            required: true,
        },
        {
            type: "anyOf",
            courses: [
                "MATH 101",
                "MATH 103",
                "MATH 105",
                "MATH 121",
            ],
            required: true,
        },
        {
            type: "hasCourse",
            courses: ["CPSC 210"],
            required: true,
        },
        {
            type: "allOf",
            courses: ["CPSC 213", "CPSC 221"],
            required: true,
        },
        {
            type: "anyOf",
            courses: ["MATH 111", "MATH 221"],
            required: true,
        },
        {
            type: "hasCourse",
            courses: ["MATH 200"],
            required: true,
        },
        {
            type: "anyOf",
            courses: ["STAT 251", "STAT 200", "STAT 201"],
            required: true,
        },
        {
            type: "allOf",
            courses: ["CPSC 310", "CPSC 313", "CPSC 320"],
            required: true,
        },
        {
            type: "creditAtLeastFrom",
            courses: [],
            required: 0,
            minimumCredits: 12,
            filter: {
                subject: ["CPSC", "AI"],
                minLevel: 300,
            },
        },
        {
            type: "creditAtLeastFrom",
            courses: [],
            required: 0,
            minimumCredits: 9,
            filter: {
                subject: ["CPSC", "AI"],
                minLevel: 400,
            },
        },
    ],
};