"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useFiltersStore } from "@/lib/stores/useFiltersStore";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const debounced = useDebounce(query, 300);

    const setSearch = useFiltersStore((s) => s.setSearch);
    const addRecentSearch = useFiltersStore((s) => s.addRecentSearch);

    useEffect(() => {
        if (debounced.trim()) {
            setSearch(debounced);
            addRecentSearch(debounced);
        }
    }, [debounced, setSearch, addRecentSearch]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border px-2 py-1 rounded w-full"
            />
        </div>
    );
}