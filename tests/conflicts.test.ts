import { describe, it, expect } from "vitest";

// простая функция LWW
function resolveConflicts(actions: { id: string; timestamp: number; value: string }[]) {
    const map = new Map<string, { timestamp: number; value: string }>();
    for (const { id, timestamp, value } of actions) {
        const existing = map.get(id);
        if (!existing || existing.timestamp < timestamp) {
            map.set(id, { timestamp, value });
        }
    }
    return Array.from(map.values());
}

describe("Last Write Wins", () => {
    it("takes the last change", () => {
        const actions = [
            { id: "1", timestamp: 1, value: "old" },
            { id: "1", timestamp: 2, value: "new" },
        ];
        const result = resolveConflicts(actions);
        expect(result[0].value).toBe("new");
    });
});