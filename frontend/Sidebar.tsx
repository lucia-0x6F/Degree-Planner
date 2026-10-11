import { faculties, majors, years } from "./App";
import { useState } from "react";

export function Sidebar() {

    const [faculty, setFaculty] = useState(faculties[0]);
    const [specialization, setSpecialization] = useState(majors[0]);
    const [year, setYear] = useState<number>(Number(years[0]));


    return (
        <aside className="border-r p-5 space-y-6">

            <div>
                <h2 className="font-bold mb-3">
                    Faculty
                </h2>

                <select className="border rounded p-2 w-full"
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}>
                    {faculties.map((faculty) => (
                        <option key={faculty}>
                            {faculty}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <h2 className="font-bold mb-3">
                    Major
                </h2>

                <select className="border rounded p-2 w-full"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}>
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

                <select className="border rounded p-2 w-full"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}>
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
