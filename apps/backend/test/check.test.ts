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


describe('testCheck', () => {
  let check: Check

  beforeEach(() => {
    check = new Check()
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