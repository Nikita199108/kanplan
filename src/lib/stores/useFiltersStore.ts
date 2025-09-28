"use client";
import { create } from "zustand";

interface FiltersState {
    search: string;
    tags: string[];
    recentSearches: string[];

    setSearch: (query: string) => void;
    setTags: (tags: string[]) => void;
    addRecentSearch: (query: string) => void;
}

export const useFiltersStore = create<FiltersState>((set, get) => ({
    search: "",
    tags: [],
    recentSearches: typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("recentSearches") || "[]")
        : [],

    setSearch: (query) => set({ search: query }),
    setTags: (tags) => set({ tags }),
    addRecentSearch: (query) => {
        if (typeof window === "undefined") return;

        const updated = [query, ...get().recentSearches.filter((q) => q !== query)].slice(0, 5);
        localStorage.setItem("recentSearches", JSON.stringify(updated));
        set({ recentSearches: updated });
    },
}));