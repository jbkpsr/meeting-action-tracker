import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ActionItemList from "../ActionItemList";

/* ---------------- MOCK API ---------------- */

vi.mock("../../api/client", () => ({
  api: {
    get: vi.fn(),
  },
}));

/* ---------------- MOCK ROW COMPONENT ---------------- */

vi.mock("../ActionItemRow", () => ({
  default: ({ item }: any) => (
    <div data-testid="row">{item.task}</div>
  ),
}));

import { api } from "../../api/client";

describe("ActionItemList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches and renders action items", async () => {
    (api.get as any).mockResolvedValueOnce({
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

    render(<ActionItemList refreshKey={0} />);

    await waitFor(() => {
      expect(screen.getByText(/prepare budget/i)).toBeInTheDocument();
    });

    expect(api.get).toHaveBeenCalledWith("/action-items");
  });

  it("shows empty state when no items", async () => {
    (api.get as any).mockResolvedValueOnce({
      data: [],
    });

    render(<ActionItemList refreshKey={0} />);

    await waitFor(() => {
      expect(
        screen.getByText(/no action items/i)
      ).toBeInTheDocument();
    });
  });

  it("changes filter and refetches", async () => {
    (api.get as any).mockResolvedValue({
      data: [],
    });

    render(<ActionItemList refreshKey={0} />);

    const openButton = screen.getByRole("button", {
      name: "OPEN",
    });

    await userEvent.click(openButton);

    await waitFor(() => {
      expect(api.get).toHaveBeenLastCalledWith(
        "/action-items?status=OPEN"
      );
    });
  });

  it("refetches when refreshKey changes", async () => {
    (api.get as any).mockResolvedValue({
      data: [],
    });

    const { rerender } = render(
      <ActionItemList refreshKey={0} />
    );

    expect(api.get).toHaveBeenCalledTimes(1);

    rerender(<ActionItemList refreshKey={1} />);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledTimes(2);
    });
  });
});
