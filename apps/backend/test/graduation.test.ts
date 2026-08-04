import { Check } from '../Calculator/Check';
import { Course } from '../Calculator/Course';
import { Graduation } from '../Calculator/Graduation';
import { describe, it, expect, beforeEach } from 'vitest'
import { Specialization } from '../Calculator/Specialization';
import { Requirement } from '../Calculator/Requirement';

const check = new Check();
const CompSci : Specialization = new Specialization("CS","0376",[new Requirement("hasCourse",[])],42);

let graduation: Graduation;


beforeEach(() => {
  graduation = new Graduation(120, CompSci);
});

describe('testGraduation', () => {

  it('progressCalculation', () => {
    expect(graduation.progressCalculation()).toBe(1);
  });

  it('upper48Check', () => {

    const courses = [new Course("CPSC", "310", 3, "CPSC310", "Science", "")];
    expect(graduation.upper48Check(courses)).toBe(3);

  });

  it('science72Check', () => {

    const courses = [
      new Course("CPSC", "110", 4, "CPSC110", "Science", ""),
      new Course("ENGL", "110", 3, "ENGL110", "Arts", "")

    ];

    expect(graduation.science72Check(courses)).toBe(4);

  });

  it('scienceUpper30Check', () => {

    const courses = [
      new Course("CPSC", "310", 3, "CPSC310", "Science", ""),
      new Course("CPSC", "110", 4, "CPSC110", "Science", "")

    ];
    expect(graduation.scienceUpper30Check(courses)).toBe(3);

  });

  it('arts12Check', () => {

    const courses = [new Course("ENGL", "110", 3, "ENGL110", "Arts", "")];
    expect(graduation.arts12Check(courses)).toBe(3);

  });

  it('scienceBreadthCheck', () => {

    const courses = [
      new Course("MATH", "200", 3, "MATH200", "Science", ""),
      new Course("CPSC", "110", 4, "CPSC110", "Science", ""),
      new Course("PHYS", "131", 3, "PHYS131", "Science", "")

    ];

    const result = graduation.scienceBreadthCheck(courses);
    expect(result).toContain("MATH");
    expect(result).toContain("CPSC");
    expect(result).toContain("PHYS");

  });

  it('communicationCheck', () => {

    const courses = [
      new Course("SCIE", "113", 3, "SCIE113", "Science", ""),
      new Course("ENGL", "110", 3, "ENGL110", "Arts", "")

    ];

    expect(graduation.communicationCheck(courses)).toBe(2);

  });

  it('labCheck', () => {
    const courses = [new Course("PHYS", "101", 3, "PHYS101", "Science", "")];
    expect(graduation.labCheck(courses)).toBe(true);

  });

  it('courseValidityCheck', () => {

    const course = new Course("CPSC", "110", 4, "CPSC110", "Science", "");
    const mandatory = [course];
    graduation.courseValidityCheck([course], mandatory);
    expect(mandatory.length).toBe(0);

  });

  it('validElectiveCount', () => {

    const courses = [new Course("MATH", "100", 3, "MATH100", "Science", "")];
    expect(graduation.validElectiveCount(courses, graduation.specialization)).toBeGreaterThanOrEqual(0);

  });

});