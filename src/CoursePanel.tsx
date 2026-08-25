import { useState } from "react";
import Search from "./Search";

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


            </div>

             <Search toggleCourse={toggleCourse}/>


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
