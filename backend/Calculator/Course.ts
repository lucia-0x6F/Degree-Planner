export class Course {
    cnt: unknown;
    
    constructor(
        public readonly subject_code: string,    //mandatory property
        public readonly course_code: string,
        public readonly credit: number,
        public readonly course_name: string,
        public readonly faculty: string,
        public readonly description: string,
    ){}

    get code(): string {

        return `${this.subject_code} ${this.course_code}`;

    }

   

   

}