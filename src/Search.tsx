import { useState, type ChangeEventHandler } from "react";
import SearchBar from "./SearchBar";
import { courses } from "./App";

interface SearchProps {
    toggleCourse: (code: string) => void;
}

const Search = ({ toggleCourse }: SearchProps) =>  {
    const [searchContentData, setSearchContentData] = useState<string>('');

    const searchHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();
        setSearchContentData(e.currentTarget.value);
    }

    return (
         <div className="space-y-4">
            <SearchBar
                value={searchContentData}
                placeholder={`Search by name`}
                searchHandler={searchHandler}
            />

        <div>
            <ul>
            {
            courses.filter(course =>
                course.code.toLowerCase().includes(searchContentData.toLowerCase()) ||
                course.name.toLowerCase().includes(searchContentData.toLowerCase())
            )
            .map(course => (
                <li key={course.code}>
                    <button
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
                </li>

            ))
            }
            </ul>
        </div>
        </div>
    )
}

export default Search;