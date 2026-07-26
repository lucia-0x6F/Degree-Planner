import { Course } from "./Course";

export class graduation{
    constructor(
        public credits: number,    
        public electiveCredit: number,
        public mandatoryCourses : Course[] = [],
    ){}

    public progressCalculation(credits: number) : number {
        return credits / 120;
    }

    public courseValidityCheck(completedCourses : Course[]) { 

        for (const c of completedCourses) {
            if (this.mandatoryCourses.includes(c)) {
                const index = this.mandatoryCourses.indexOf(c);
                if (index !== -1) {
                    this.mandatoryCourses.splice(index, 1);
                }
            } else {
                this.electiveCredit += c.getCredit();
            }
        }
    }   //if the course belongs to the mandatory courses, remove the corresponding course from the array
        //if not, add the elective credit

    public upper48Check(completedCourses : Course[]) : number{ //completedCourses should act as field or just parameter??? 
    // parameter, since for each user, completedCourses should be different and it would be varified for a lot of times during the course planning
        let count = 0;
        for (const c of completedCourses) {
            if (parseInt(c.getCode()) >= 300) {
                count += c.getCredit();
            }
        }
        return count;
    }

    public science72Check(completedCourses : Course[]) : number{ 
        let count = 0;
        for (const c of completedCourses) {
            if (c.getFaculty() == "Science") { //enum or string
                count += c.getCredit();
            }
        }
        return count;
    } //so in my original dataset, each course's subject has been ok, so theres no need to classify again

     public scienceUpper30Check(completedCourses : Course[]) : number{ 
        let count = 0;
        for (const c of completedCourses) {
            if (c.getFaculty() == "Science" && parseInt(c.getCode()) >= 300) { //enum or string
                count += c.getCredit();
            }
        }
        return count;
    } 

    public arts12Check(completedCourses : Course[]) : number{ 
        let count = 0;
        for (const c of completedCourses) {
            if (c.getFaculty() == "Arts") { //enum or string
                count += c.getCredit();
            }
        }
        return count;
    } 

    //need to add the specific cases that are the exclusion of science course!!!

    // public scienceBreadthCheck(completedCourses : Course[]) : String[] {
    //     let breadth : String[] = [];
    //     let count = 0;
    //     for (const c of completedCourses) {
    //         if (c.getSubject() == "MATH" ) {
    //             if (c.getCode() != "302") {
    //                 breadth.push("MATH");
    //             } else {
    //                 breadth.push("STAT");
    //             }
    //         } else if (c.getSubject() == "CPSC") {
    //             breadth.push("CPSC");
    //         } else if (c.getSubject() == "PHYS" && c.getCode() != "100") {
    //             breadth.push("PHYS");
    //         } else if (c.getSubject() == "BIOL") {
    //             if( c.getCode() != "140" && c.getCode() != "300") {
    //                 breadth.push("BIOL");
    //             } else if (c.getCode() == "300") {
    //                 breadth.push("STAT");
    //             }
    //         } else if (c.getSubject() == "BIOC" || c.getSubject() == "MICB") {
    //             breadth.push("BIOL");
    //         } else if (c.getSubject() == "PSYC") {
    //             if (60 <= parseInt(c.getCode().substring(1)) && parseInt(c.getCode().substring(1)) <= 89) {
    //                 breadth.push("BIOL");
    //             }
    //         } else if (c.getSubject() == "GEOB") {
    //             if (c.getCode() == "207") {
    //                 breadth.push("BIOL");
    //             } else {
    //                 breadth.push("ASTR");
    //             }
    //         } else if (c.getSubject() == "CHEM" && c.getCode() != "100" && c.getCode() != "300") {
    //             breadth.push("CHEM");
    //         } else if (c.getSubject() == "STAT" || c.getName() == "DSCI100") {
    //             breadth.push("STAT");
    //         } else if (c.getSubject() == "ASTR" || c.getSubject() == "ATSC" || c.getSubject() == "ENVR") {
    //             breadth.push("ASTR");
    //         } else if (c.getSubject() == "EOSC" || c.getCode() == "111") {
    //             breadth.push("EOSC");
    //         }

    //     }
    //      return breadth; //need tests!!!
    // }

    public scienceBreadthCheck(completedCourses: Course[]): string[] {
        const breadth: string[] = [];

        for (const c of completedCourses) {
            const subject = c.getSubject();
            const code = c.getCode();
            const name = c.getName();
            const courseNum = parseInt(code.substring(1));

            if (subject === "MATH") {
                breadth.push(code === "302" ? "STAT" : "MATH");

            } else if (subject === "CPSC") {
                breadth.push("CPSC");

            } else if (subject === "PHYS" && code !== "100") {
                breadth.push("PHYS");

            } else if (subject === "BIOL") {
                if (code !== "140" && code !== "300") {
                    breadth.push("BIOL");
                } else if (code === "300") {
                    breadth.push("STAT");
                }

            } else if (subject === "BIOC" || subject === "MICB") {
                breadth.push("BIOL");

            } else if (subject === "PSYC") {
                if (60 <= courseNum && courseNum <= 89) {
                    breadth.push("BIOL");
                }

            } else if (subject === "GEOB") {
                breadth.push(code === "207" ? "BIOL" : "ASTR");

            } else if (
                subject === "CHEM" &&
                code !== "100" &&
                code !== "300"
            ) {
                breadth.push("CHEM");

            } else if (
                subject === "STAT" ||
                name === "DSCI100"
            ) {
                breadth.push("STAT");

            } else if (
                ["ASTR", "ATSC", "ENVR"].includes(subject)
            ) {
                breadth.push("ASTR");

            } else if (
                subject === "EOSC" ||
                code === "111"
            ) {
                breadth.push("EOSC");
            }
        }

        return breadth;
    }

    public communicationCheck(completedCourses : Course[]) : number{
        let count : number = 0;
         for (const c of completedCourses) {
            if (c.getName() == "SCIE113") {
                count++;
            } else if (c.getName() == "ENGL100" || c.getName() == "ENGL111") {
                count++;
            }
         }
         return count;
    }
    // TODO
    //- SCIE 300(Combined Major in Science specialization)
    //- CHEM 300(Chemistry specializations)
    //- ENVR 200 (Environmental Sciences specializations)

    public labCheck(completedCourses : Course[]) : boolean {
        const labs : String[] = ["ASTR101", "ASTR102", "BIOL140", "CHEM111", "CHEM115", "CHEM121", "CHEM123", "CHEM135", "EOSC111", "PHYS101",
            "PHYS107" , "PHYS109" , "PHYS119", "PHYS159", "SCIE001"];
        for (const c of completedCourses) {
            let name : string = c.getName();
            if (labs.includes(name)) {
                return true;
            }
        }
        return false;
    }

// Foundational Requirement
// - Biology 11, Biology 12, or 3 credits of 100-level BIOL
// - Chemistry 11, Chemistry 12, or 3 credits of 100-level CHEM
// - Physics 11, Physics 12, or 3 credits of 100-level PHYS

}