import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Home from "../Home";

let callCount = 0;

vi.mock("../../api/client", () => ({
  api: {
    post: vi.fn().mockResolvedValue({
      data: {
        transcript: { id: "1", content: "Test" },
        actionItems: [],
      },
    }),
    get: vi.fn().mockImplementation(() => {
      callCount++;

      if (callCount === 1) {
        return Promise.resolve({ data: [] });
      }

      return Promise.resolve({
        data: [
          {
            id: "1",
            task: "Prepare budget",
            owner: "Rahul",
            dueDate: null,
            status: "OPEN",
          },
        ],
      });
    }),
  },
}));

describe("Home Integration", () => {
  it("refetches action items after transcript processed", async () => {
    render(<Home />);

    const textarea = screen.getByPlaceholderText(/paste transcript/i);

    const button = screen.getByRole("button", {
      name: /process transcript/i,
    });

    await userEvent.type(textarea, "Test transcript");
    await userEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText(/prepare budget/i)
      ).toBeInTheDocument();
    });
  });
});
