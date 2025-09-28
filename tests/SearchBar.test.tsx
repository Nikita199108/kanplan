import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "@/components/SearchBar";
import { describe, it, expect } from "vitest";

describe("SearchBar", () => {
    it("updates user input", () => {
        render(<SearchBar />);
        const input = screen.getByPlaceholderText(/search/i);
        fireEvent.change(input, { target: { value: "feature" } });
        expect((input as HTMLInputElement).value).toBe("feature");
    });
});