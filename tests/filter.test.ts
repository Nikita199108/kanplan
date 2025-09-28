import { describe, expect, it } from "vitest";

interface TestCard {
    id: string;
    title: string;
    description?: string;
    tags: string[];
}

function filterCards(cards: TestCard[], search: string, tags: string[]) {
    return cards.filter((c) => {
        const matchSearch =
            !search ||
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.description?.toLowerCase().includes(search.toLowerCase());

        const matchTags = tags.length === 0 || tags.every((t) => c.tags.includes(t));

        return matchSearch && matchTags;
    });
}

describe("Card filtering", () => {
    const cards: TestCard[] = [
        { id: "1", title: "Fix bug", description: "critical", tags: ["bug"] },
        { id: "2", title: "New feature", description: "", tags: ["feature"] },
    ];

    it("searches by word", () => {
        const result = filterCards(cards, "fix", []);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe("1");
    });

    it("filters by tag", () => {
        const result = filterCards(cards, "", ["feature"]);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe("2");
    });
});