import { useState } from "react";
import { courses } from "./App";

export function CoursePanel() {

    const [selected, setSelected] = useState<string[]>([]);


    function toggleCourse(code: string) {

        setSelected((prev) => (
            prev.includes(code)
                ? prev.filter(c => c !== code)
                : [...prev, code]
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
                    className="border rounded p-2 w-full" />

            </div>



            <div>

                <h2 className="font-bold mb-3">
                    Courses
                </h2>


                <div className="space-y-2">

                    {courses.map(course => (

                        <button
                            key={course.code}
                            onClick={() => toggleCourse(course.code)}
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


                {selected.length === 0
                    ?
                    <p className="text-gray-500">
                        No courses selected
                    </p>
                    :
                    <ul className="list-disc ml-5">
                        {selected.map(c => (
                            <li key={c}>
                                {c}
                            </li>
                        ))}
                    </ul>}

            </div>


        </main>
    );
}
