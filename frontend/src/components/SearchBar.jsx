import { useState } from "react";

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    const handleClear = () => {
        setQuery("");
        onSearch("");
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search tasks..."
            />
            {query && (
                <button className="clear-btn" onClick={handleClear}>
                    ✕
                </button>
            )}
        </div>
    );
}

export default SearchBar;
