export class Course {
    
    constructor(
        public readonly subject_code: string,    //mandatory property
        public readonly course_code: string,
        public readonly credit: number,
        public readonly course_name: string,
        public readonly faculty: string,
        public readonly description: string,
    ){}

   

   

}