import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TranscriptForm from "../TranscriptForm";

vi.mock("../../api/client", () => ({
  api: {
    post: vi.fn(),
  },
}));

import { api } from "../../api/client";

describe("TranscriptForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state while processing", async () => {
    (api.post as any).mockImplementation(
      () => new Promise(() => {}) // never resolves
    );

    render(<TranscriptForm onProcessed={vi.fn()} />);

    const textarea = screen.getByPlaceholderText(/paste transcript/i);
    const button = screen.getByRole("button");

    await userEvent.type(textarea, "Test transcript");
    await userEvent.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/processing/i);
  });

  it("calls onProcessed on API success", async () => {
    const mockOnProcessed = vi.fn();

    (api.post as any).mockResolvedValue({
      data: {
        transcript: { id: "1", content: "Test" },
        actionItems: [],
      },
    });

    render(<TranscriptForm onProcessed={mockOnProcessed} />);

    const textarea = screen.getByPlaceholderText(/paste transcript/i);
    const button = screen.getByRole("button");

    await userEvent.type(textarea, "Test transcript");
    await userEvent.click(button);

    await waitFor(() => {
      expect(mockOnProcessed).toHaveBeenCalled();
    });
  });

  it("shows error message when API fails", async () => {
    (api.post as any).mockRejectedValue({
      response: {
        data: { error: "Server failed" },
      },
    });

    render(<TranscriptForm onProcessed={vi.fn()} />);

    const textarea = screen.getByPlaceholderText(/paste transcript/i);
    const button = screen.getByRole("button");

    await userEvent.type(textarea, "Test transcript");
    await userEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText(/server failed/i)
      ).toBeInTheDocument();
    });
  });
});
