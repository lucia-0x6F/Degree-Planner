import { Course } from '../models/Course';
import { describe, it, expect, beforeEach } from 'vitest'


const CPSC110 : Course = new Course("CPSC","110", 4,"Computation, Programs, and Programming", "Faculty of Science", "Description");
const CPSC121 : Course = new Course("CPSC","121",4, "Models of Computation","Faculty of Science","Description"); 
const CPSC210 : Course = new Course("CPSC","210",4, "Software Construction","Faculty of Science","Description"); 
const completed121 = [CPSC121];
const completed110 = [CPSC110];
const c110p121 = [CPSC110,CPSC121];
const c121p210 = [CPSC121,CPSC210];
const courses =  ["CPSC121", "CPSC210"];

import Database from 'better-sqlite3';
import { CourseQuery } from '../../data/CourseQuery';
import { Requirement } from '../models/Requirement';
import { Specialization } from '../models/Specialization';
import { Science } from '../faculties/Science';
import { Check } from '../Calculator/Check';


let graduation: Science;

const db = new Database('data/courses.db');

const courseQuery = new CourseQuery(db);

const requirements: Requirement[] = [

    new Requirement(
        "hasCourse",
        [courseQuery.getCourse("SCIE", "113")],  //re0
        true
    ),

    new Requirement(
        "hasCourse",
        [courseQuery.getCourse("CPSC", "110")],  //re1
        true
    ),

    new Requirement(
        "hasCourse",
        [courseQuery.getCourse("CPSC", "121")],  //re2
        true
    ),

    new Requirement(                            //re3
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

    new Requirement(                           //re4
        "anyOf",
        [
            courseQuery.getCourse("MATH", "101"),
            courseQuery.getCourse("MATH", "103"),
            courseQuery.getCourse("MATH", "105"),
            courseQuery.getCourse("MATH", "121")
        ],
        true
    ),

    new Requirement(                           //re5
        "hasCourse",
        [courseQuery.getCourse("CPSC", "210")],
        true
    ),

    new Requirement(                           //re6
        "allOf",
        [
            courseQuery.getCourse("CPSC", "213"),
            courseQuery.getCourse("CPSC", "221")
        ],
        true
    ),

    new Requirement(                             //re7
        "anyOf",
        [
            courseQuery.getCourse("MATH", "111"),
            courseQuery.getCourse("MATH", "221")
        ],
        true
    ),

    new Requirement(                              //re8
        "hasCourse",
        [courseQuery.getCourse("MATH", "200")],
        true
    ),

    new Requirement(                              //re9
        "anyOf",
        [courseQuery.getCourse("STAT", "251"),
        courseQuery.getCourse("STAT", "200"),
        courseQuery.getCourse("STAT", "201")],
        true
    ),

    new Requirement(                              //re10
        "allOf",
        [
            courseQuery.getCourse("CPSC", "310"),
            courseQuery.getCourse("CPSC", "313"),
            courseQuery.getCourse("CPSC", "320")
        ],
        true
    ),

    new Requirement(                              //re11
        "creditAtLeastFrom",
        [],
        0,
        12,
        {
            subject: ["CPSC", "AI"],
            minLevel: 300
        }
    ),

    new Requirement(                            //re12
        "creditAtLeastFrom",
        [],
        0,
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
    52,
);



const courseList: Course[] = [

    courseQuery.getCourse("CPSC", "110"),
    courseQuery.getCourse("CPSC", "121"),
    courseQuery.getCourse("CPSC", "210"),
    courseQuery.getCourse("CPSC", "100"),
    courseQuery.getCourse("PHIL", "220"),
    courseQuery.getCourse("SCIE", "113"),
    courseQuery.getCourse("FREN", "101"),
    courseQuery.getCourse("PHYS", "131"),
    courseQuery.getCourse("MATH", "100"),
    courseQuery.getCourse("MATH", "101"),
    courseQuery.getCourse("ECON", "101"),
    courseQuery.getCourse("CPSC", "213"),
    courseQuery.getCourse("MATH", "111"),
    courseQuery.getCourse("CPSC", "221"),
    courseQuery.getCourse("CPSC", "310"),
    courseQuery.getCourse("STAT", "200"),
    courseQuery.getCourse("MATH", "200"),
    courseQuery.getCourse("BIOL", "112"),
    courseQuery.getCourse("ASTR", "101"),
    courseQuery.getCourse("PHIL", "120"),
    courseQuery.getCourse("PHIL", "321"),

];

//start

describe('testCheck', () => {
  let check: Check

  beforeEach(() => {
    check = new Check([],0,0);
    graduation = new Science(120, CompSci);
    
  })

  //Graduation.ts
  it('progressCalculation', () => {
    const graduation = new Science(69, CompSci);
    expect(graduation.progressCalculation()).toBe(0.57);
});


it('upper48Check', () => {
    expect(graduation.upper48Check(courseList)).toBe(7);
});


it('science72Check', () => {
    expect(graduation.science72Check(courseList)).toBe(54);
});

it('scienceUpper30Check', () => {
    expect(graduation.scienceUpper30Check(courseList)).toBe(4);
});


it('arts12Check', () => {
    expect(graduation.arts12Check(courseList)).toBe(15);
});


it('communicationCheck', () => {
    expect(graduation.communicationCheck(courseList)).toBe(1);
});


it('labCheck', () => {
    expect(graduation.labCheck(courseList)).toBe(true);
}); 


it('scienceBreadthCheck', () => {
    const result = graduation.scienceBreadthCheck(courseList);

    expect(result).toContain("CPSC");
    expect(result).toContain("MATH");
    expect(result).toContain("STAT");
    expect(result).toContain("PHYS");
     expect(result).toContain("BIOL");
    expect(result).toContain("ASTR");
});



it('notSciArts', () => {
    expect(graduation.notSciArts(courseList)).toBe(0);
});

//fix


  //Check.ts
  //anyOf
  it('anyOfSingle', () => {
    expect(check.anyOf(completed121, courses)).toBe(true);
    expect(check.anyOf(completed110, courses)).toBe(false);
  })

   it('anyOfMulti', () => {
    expect(check.anyOf(c110p121, courses)).toBe(true);
    expect(check.anyOf(c121p210, courses)).toBe(true);
  })

  //complete evaluation
  it('evaluate result', () => {
  check.evaluate(courseList, CompSci);
  expect(check.mandatoryCount).toBe(10);
  expect(check.electiveProgress).toBe(27);

});

  it('evaluate0', () => {
    check.evaluate(courseList, CompSci);
    expect(CompSci.requirements[0].result).toBe(true);
  })

    it('evaluate1', () => {
    check.evaluate(courseList, CompSci);
    expect(CompSci.requirements[1].result).toBe(true);


  })

    it('evaluate2', () => {
    check.evaluate(courseList, CompSci);
    expect(CompSci.requirements[2].result).toBe(true);
  })


    it('evaluate3', () => {
    check.evaluate(courseList, CompSci);
    expect(CompSci.requirements[3].result).toBe(true);
  })

        it('evaluate4', () => {
    check.evaluate(courseList, CompSci);
    expect(CompSci.requirements[4].result).toBe(true);

  })
        it('evaluate5', () => {
    check.evaluate(courseList, CompSci);
    expect(CompSci.requirements[5].result).toBe(true);
  })

   it('evaluate6', () => {
    check.evaluate(courseList, CompSci);
    expect(CompSci.requirements[6].result).toBe(true);
  })

   it('evaluate7', () => {
    check.evaluate(courseList, CompSci);
    expect(CompSci.requirements[7].result).toBe(true);
  })


   it('evaluate8', () => {
    check.evaluate(courseList, CompSci);
    expect(CompSci.requirements[8].result).toBe(true);
  })


   it('evaluate9', () => {
    check.evaluate(courseList, CompSci);
    expect(CompSci.requirements[9].result).toBe(true);
  })


   it('evaluate10', () => {
    check.evaluate(courseList, CompSci);
    expect(CompSci.requirements[10].result).toBe(false);
  })


   it('evaluate11', () => {
    check.evaluate(courseList, CompSci);
    expect(CompSci.requirements[11].result).toBe(0);
  })


   it('evaluate12', () => {
    check.evaluate(courseList, CompSci);
    expect(CompSci.requirements[12].result).toBe(0);
  })

  //allOf   
   it('allOf', () => {
    expect(check.allOf(completed121, courses)).toBe(false);
      expect(check.allOf(completed110, courses)).toBe(false);
    expect(check.allOf(c121p210, courses)).toBe(true);
  })

   it('hasCourse', () => {
    expect(check.hasCourse([CPSC210,CPSC121], CPSC110)).toBe(false);
    expect(check.hasCourse([CPSC121,CPSC210], CPSC121)).toBe(true);
  })






})