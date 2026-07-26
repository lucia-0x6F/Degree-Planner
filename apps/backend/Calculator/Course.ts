export class Course {
    constructor(
        public subject_code: string,    //mandatory property
        public course_code: string,
        public credit: number,
        public course_name: string,
        public faculty: string,
        public description: string,
    ){}

    public getName() {
        return this.course_code + this.course_name;
    }

    public getCredit() {
        return this.credit;
    }

    public getCode(): string {
        return this.course_code;
    }

    public getSubject() {
        return this.subject_code;
    }

    public getFaculty() {
        return this.faculty;
    }

}