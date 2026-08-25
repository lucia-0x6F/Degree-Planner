import { majors, years } from "./App";


export function Sidebar() {
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
