"use client";

import { useFiltersStore } from "@/lib/stores/useFiltersStore";

const availableTags = ["bug", "feature", "urgent", "design"];

export default function TagsFilter() {
    const tags = useFiltersStore((s) => s.tags);
    const setTags = useFiltersStore((s) => s.setTags);

    function toggleTag(tag: string) {
        if (tags.includes(tag)) {
            setTags(tags.filter((t) => t !== tag));
        } else {
            setTags([...tags, tag]);
        }
    }

    return (
        <div className="flex gap-2">
            {availableTags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-2 py-1 rounded ${tags.includes(tag) ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                >
                    #{tag}
                </button>
            ))}
        </div>
    );
}