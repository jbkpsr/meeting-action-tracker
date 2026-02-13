import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HistoryPanel from "../HistoryPanel";

vi.mock("../../api/client", () => ({
  api: {
    get: vi.fn().mockResolvedValue({
      data: [
        {
          id: "1",
          content: "Test transcript",
          created_at: "2026-02-12T00:00:00Z",
        },
      ],
    }),
  },
}));

describe("HistoryPanel", () => {
  it("renders transcript history", async () => {
    render(<HistoryPanel refreshKey={0} />);

    await waitFor(() => {
      expect(
        screen.getByText(/test transcript/i)
      ).toBeInTheDocument();
    });
  });

  
it("shows empty history message", async () => {
  vi.mocked(require("../../api/client").api.get).mockResolvedValueOnce({
    data: [],
  });

render(<HistoryPanel refreshKey={0} />);

  await waitFor(() => {
    expect(screen.getByText(/last 5 transcripts/i)).toBeInTheDocument();
  });
});
  
});


