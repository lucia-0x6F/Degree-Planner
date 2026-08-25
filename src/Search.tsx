import { useState, type ChangeEvent } from "react";
import SearchBar from "./SearchBar";

interface Course {
    full_code: string;
    subject_code: string;
    course_code: string;
    credit: string;
    course_name: string;
    faculty: string;
    description: string;
}

interface SearchProps {
    toggleCourse: (code: string) => void;
}

const Search = ({ toggleCourse }: SearchProps) =>  {
    const [searchContentData, setSearchContentData] = useState('');

    const [results, setResults] = useState<Course[]>([]);
        
    async function searchHandler(event: ChangeEvent<HTMLInputElement>) {

    const value = event.currentTarget.value;

    setSearchContentData(value);

    const input = value.trim();

    if (!input) {
        setResults([]);
        return;
    }

    const [subject, code] = input.split(/\s+/);

    if (subject && code && code.length >= 3) {
        const response = await fetch(
            `http://localhost:3000/api/course?subject=${subject}&code=${code}`
        );

        if (!response.ok) {
            setResults([]);
            return;
        }

        const data : Course = await response.json();

        if (data) {
            setResults([data]);
        } else {
            setResults([]);
        }
    }
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
            results.map(course => (
                <li key={course.full_code}>
                    <button
                        onClick={() => toggleCourse(course.full_code)}
                        className="border rounded p-3 w-full text-left hover:bg-gray-100"
                    >
                        <div className="font-medium">
                            {course.full_code}
                        </div>
                        <div className="text-sm text-gray-500">
                            {course.course_name}
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