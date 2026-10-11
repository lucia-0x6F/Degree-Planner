/* eslint-disable react-refresh/only-export-components */
import { CoursePanel } from "./CoursePanel";
import { ProgressPanel } from "./ProgressPanel";
import { Sidebar } from "./Sidebar";

export const faculties = [
    "Faculty of Applied Science",
    "Faculty of Arts",
    "Faculty of Commerce and Business Administration",
    "Faculty of Dentistry",
    "Faculty of Education",
    "Faculty of Forestry",
    "Faculty of Graduate and Postdoctoral Studies",
    "Faculty of Land and Food Systems",
    "Faculty of Medicine",
    "Faculty of Pharmaceutical Sciences",
    "Faculty of Science",
    "Peter A. Allard School of Law"
];

export const majors = [
   "Astronomy",
    "Atmospheric Science",
    "Biochemistry",
    "Biology",
    "Biophysics",
    "Biotechnology",
    "Cellular, Anatomical and Physiological Sciences",
    "Chemistry",
    "Cognitive Systems",
    "Combined Major in Science",
    "Computer Science",
    "Data Science",
    "Earth and Ocean Sciences",
    "Environmental Sciences",
    "Forensic Science",
    "Geographical Sciences",
    "Geological Sciences",
    "Geophysics",
    "Integrated Sciences",
    "Mathematics",
    "Mathematics and Economics",
    "Microbiology and Immunology",
    "Neuroscience",
    "Oceanography",
    "Pharmacology",
    "Physics",
    "Statistics",
    "Statistics and Economics",
];

export const years = [
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 4+",
];

export const courses = [
  {
    code: "CPSC 110",
    name: "Computation, Programs, and Programming",
    credits: 4,
  },
  {
    code: "CPSC 210",
    name: "Software Construction",
    credits: 4,
  },
  {
    code: "CPSC 221",
    name: "Basic Algorithms and Data Structures",
    credits: 4,
  },
  {
    code: "MATH 200",
    name: "Calculus",
    credits: 3,
  },
  {
    code: "MATH 221",
    name: "Matrix Algebra",
    credits: 3,
  },
];


export default function App(){

  return (

       <div className="min-h-screen grid grid-cols-3">

      <Sidebar />

      <CoursePanel />

      <ProgressPanel />

    </div>

  );
}