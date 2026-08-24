import { useState } from "react";

const majors = [
  "Computer Science",
  "Mathematics",
  "Biology",
  "Physics",
];

const years = [
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
];

const courses = [
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


function Sidebar() {
  return (
    <aside className="border-r p-5 space-y-6">

      <div>
        <h2 className="font-bold mb-3">
          Major
        </h2>

        <select className="border rounded p-2 w-full">
          {majors.map((major) => (
            <option key={major}>
              {major}
            </option>
          ))}
        </select>
      </div>


      <div>
        <h2 className="font-bold mb-3">
          Year
        </h2>

        <select className="border rounded p-2 w-full">
          {years.map((year) => (
            <option key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

    </aside>
  );
}



function CoursePanel() {

  const [selected, setSelected] = useState<string[]>([]);


  function toggleCourse(code:string){

    setSelected((prev)=>(
      prev.includes(code)
        ? prev.filter(c=>c!==code)
        : [...prev,code]
    ));

  }


  return (
    <main className="p-5 space-y-6">


      <div>
        <h2 className="text-xl font-bold mb-3">
          Course Search
        </h2>

        <input
          placeholder="Search course..."
          className="border rounded p-2 w-full"
        />

      </div>



      <div>

        <h2 className="font-bold mb-3">
          Courses
        </h2>


        <div className="space-y-2">

          {courses.map(course=>(

            <button
              key={course.code}
              onClick={()=>toggleCourse(course.code)}
              className="border rounded p-3 w-full text-left hover:bg-gray-100"
            >

              <div className="font-medium">
                {course.code}
              </div>

              <div className="text-sm text-gray-500">
                {course.name}
              </div>

            </button>

          ))}

        </div>

      </div>



      <div>

        <h2 className="font-bold mb-3">
          Selected Courses
        </h2>


        {
          selected.length===0
          ?
          <p className="text-gray-500">
            No courses selected
          </p>
          :
          <ul className="list-disc ml-5">
            {
              selected.map(c=>(
                <li key={c}>
                  {c}
                </li>
              ))
            }
          </ul>
        }

      </div>


    </main>
  );
}




function ProgressPanel(){

  return (

    <aside className="border-l p-5">

      <h2 className="font-bold text-xl mb-5">
        Graduation Progress
      </h2>


      <div className="mb-3">
        Credits
      </div>


      <div className="text-3xl font-bold">
        72 / 120
      </div>


      <div className="mt-5 bg-gray-200 rounded h-4">

        <div
          className="bg-black rounded h-4"
          style={{
            width:"60%"
          }}
        />

      </div>


      <p className="mt-3 text-gray-500">
        60% completed
      </p>


    </aside>

  );

}



export default function App(){

  return (

       <div className="min-h-screen grid grid-cols-3">

      <Sidebar />

      <CoursePanel />

      <ProgressPanel />

    </div>

  );
}