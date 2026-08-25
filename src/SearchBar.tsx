import type { ChangeEventHandler } from "react";

interface SearchBarProps {
    placeholder: string;
    value: string;
    searchHandler: ChangeEventHandler<HTMLInputElement>;
}

const SearchBar = (props: SearchBarProps) => {
    return (
        <input
            type="search"
            className="border rounded p-2 w-full"
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.searchHandler}
        />
    );
};

export default SearchBar;