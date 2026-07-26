import { Course } from "./Course";

export class graduation{
    constructor(
        public credits: number,    
        public electiveCredit: number,
        public mandatoryCourses : Course[] = [],
    ){}

    public progressCalculation() : number {
        return this.credits / 120;
    }

    public courseValidityCheck(completedCourses : Course[]) { 

        for (const c of completedCourses) {
            if (this.mandatoryCourses.includes(c)) {
                const index = this.mandatoryCourses.indexOf(c);
                if (index !== -1) {
                    this.mandatoryCourses.splice(index, 1);     //if the course belongs to the mandatory courses, remove the corresponding course from the array
                }                                               //if not, add the elective credit
            } else {
                this.electiveCredit += c.getCredit();
            }
        }
    }   

    public upper48Check(completedCourses : Course[]) : number{ 
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
            if (c.getFaculty() == "Science") {
                count += c.getCredit();
            }
        }
        return count;
    } 

     public scienceUpper30Check(completedCourses : Course[]) : number{ 
        let count = 0;
        for (const c of completedCourses) {
            if (c.getFaculty() == "Science" && parseInt(c.getCode()) >= 300) { 
                count += c.getCredit();
            }
        }
        return count;
    } 

    public arts12Check(completedCourses : Course[]) : number{ 
        let count = 0;
        for (const c of completedCourses) {
            if (c.getFaculty() == "Arts" || ["ASCI200", "ASCI220"].includes(c.getName())) { 
                count += c.getCredit();
            }
        }
        return count;
    } 

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
            let name : string = c.getName();
            if (["SCIE113", "SCIE001"].includes(name)) {
                count++;
            } else if (["ENGL110", "ENGL111"].includes(name)) {
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