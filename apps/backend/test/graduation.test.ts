import { Check } from '../Calculator/Check';
import { Course } from '../Calculator/Course';
import { Graduation } from '../Calculator/Graduation';
import { describe, it, expect, beforeEach } from 'vitest'
import { Specialization } from '../Calculator/Specialization';

const check = new Check();
const CompSci : Specialization = new Specialization("CS","0376", check,["requirement"],42);

describe('testGraduation', () => {
  let graduation: Graduation

  beforeEach(() => {
    graduation = new Graduation(120, CompSci);
  })

  it('courseValidityCheck', () => {

  })
})



//     public courseValidityCheck(completedCourses : Course[], mandatoryCourses : Course[]) { 

//     }   

//     public upper48Check(completedCourses : Course[]) : number{ 
//        
//     }

//     public science72Check(completedCourses : Course[]) : number{ 
//       
//     } 

//      public scienceUpper30Check(completedCourses : Course[]) : number{ 
//        
//     } 

//     public arts12Check(completedCourses : Course[]) : number{ 
//      
//     } 

//     public scienceBreadthCheck(completedCourses: Course[]): string[] {
//       
//     }

//     public communicationCheck(completedCourses : Course[]) : number{
//     
//     }
//   

//     public labCheck(completedCourses : Course[]) : boolean {
//        
//     }


//     public validElectiveCount(completedCourses : Course[], spec : Specialization) : number {
//       
//       
//     }

// }