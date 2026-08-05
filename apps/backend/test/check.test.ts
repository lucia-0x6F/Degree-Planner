import { Check } from '../Calculator/Check';
import { Course } from '../Calculator/Course';
import { describe, it, expect, beforeEach } from 'vitest'


const CPSC110 : Course = new Course("CPSC","110", 4,"Computation, Programs, and Programming", "Faculty of Science", "Description");
const CPSC121 : Course = new Course("CPSC","121",4, "Models of Computation","Faculty of Science","Description"); 
const CPSC210 : Course = new Course("CPSC","210",4, "Software Construction","Faculty of Science","Description"); 
const completed121 = [CPSC121];
const completed110 = [CPSC110];
const c110p121 = [CPSC110,CPSC121];
const c121p210 = [CPSC121,CPSC210];
const courses =  ["CPSC121", "CPSC210"];
const courses2 =  ["CPSC121", "CPSC210","CPSC110"];

import Database from 'better-sqlite3';
import { CourseQuery } from '../../../data/CourseQuery';
import { Graduation } from '../Calculator/Graduation';
import { Requirement } from '../Calculator/Requirement';
import { Specialization } from '../Calculator/Specialization';


let graduation: Graduation;

const db = new Database('data/courses.db');

const courseQuery = new CourseQuery(db);

const requirements: Requirement[] = [

    new Requirement(
        "hasCourse",
        [courseQuery.getCourse("SCIE", "113")],
        true
    ),

    new Requirement(
        "hasCourse",
        [courseQuery.getCourse("CPSC", "110")],
        true
    ),

    new Requirement(
        "hasCourse",
        [courseQuery.getCourse("CPSC", "121")],
        true
    ),

    new Requirement(
        "anyOf",
        [
            courseQuery.getCourse("MATH", "100"),
            courseQuery.getCourse("MATH", "102"),
            courseQuery.getCourse("MATH", "104"),
            courseQuery.getCourse("MATH", "110"),
            courseQuery.getCourse("MATH", "120"),
            courseQuery.getCourse("MATH", "180"),
            courseQuery.getCourse("MATH", "184")
        ],
        true
    ),

    new Requirement(
        "anyOf",
        [
            courseQuery.getCourse("MATH", "101"),
            courseQuery.getCourse("MATH", "103"),
            courseQuery.getCourse("MATH", "105"),
            courseQuery.getCourse("MATH", "121")
        ],
        true
    ),

    new Requirement(
        "hasCourse",
        [courseQuery.getCourse("CPSC", "210")],
        true
    ),

    new Requirement(
        "allOf",
        [
            courseQuery.getCourse("CPSC", "213"),
            courseQuery.getCourse("CPSC", "221")
        ],
        true
    ),

    new Requirement(
        "anyOf",
        [
            courseQuery.getCourse("MATH", "111"),
            courseQuery.getCourse("MATH", "221")
        ],
        true
    ),

    new Requirement(
        "hasCourse",
        [courseQuery.getCourse("MATH", "200")],
        true
    ),

    new Requirement(
        "hasCourse",
        [courseQuery.getCourse("STAT", "251")],
        true
    ),

    new Requirement(
        "allOf",
        [
            courseQuery.getCourse("CPSC", "310"),
            courseQuery.getCourse("CPSC", "313"),
            courseQuery.getCourse("CPSC", "320")
        ],
        true
    ),

    new Requirement(
        "creditAtLeastFrom",
        [],
        9,
        {
            subject: ["CPSC", "AI"],
            minLevel: 300
        }
    ),

    new Requirement(
        "creditAtLeastFrom",
        [],
        9,
        {
            subject: ["CPSC", "AI"],
            minLevel: 400
        }
    )
];

export const CompSci = new Specialization(
    "Computer Science",
    "0376",
    requirements,
    32,
    88,
    0
);

describe('testCheck', () => {
  let check: Check

  beforeEach(() => {
    check = new Check();
    graduation = new Graduation(120, CompSci);
  })
  //anyOf 
  it('anyOfSingle', () => {
    expect(check.anyOf(completed121, courses)).toBe(true);
    expect(check.anyOf(completed110, courses)).toBe(false);
  })

   it('anyOfMulti', () => {
    expect(check.anyOf(c110p121, courses)).toBe(true);
    expect(check.anyOf(c121p210, courses)).toBe(true);
  })


  //allOf   
   it('allOf', () => {
    expect(check.allOf(completed121, courses)).toBe(false);
      expect(check.allOf(completed110, courses)).toBe(false);
    expect(check.allOf(c121p210, courses)).toBe(true);
  })


  //creditProgress 
  it('creditProgress', () => {
    expect(check.electiveCount(completed121)).toBe(4);
    expect(check.electiveCount(completed110)).toBe(4);
    expect(check.electiveCount(c121p210)).toBe(8);
  })

   it('hasCourse', () => {
    expect(check.hasCourse([CPSC210,CPSC121], CPSC110)).toBe(false);
    expect(check.hasCourse([CPSC121,CPSC210], CPSC121)).toBe(true);
  })






})