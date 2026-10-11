/* eslint-disable react-refresh/only-export-components */
import { CoursePanel } from "./CoursePanel";
import { ProgressPanel } from "./ProgressPanel";
import { Sidebar } from "./Sidebar";


export const majors = [
  "Computer Science",
  "Mathematics",
  "Biology",
  "Physics",
];

export const years = [
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
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