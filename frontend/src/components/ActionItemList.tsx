import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { ActionItem } from "../types";
import ActionItemRow from "./ActionItemRow";

interface Props {
  refreshKey: number;
}

export default function ActionItemList({ refreshKey }: Props) {
  const [list, setList] = useState<ActionItem[]>([]);
  const [filter, setFilter] = useState<"ALL" | "OPEN" | "DONE">("ALL");

  const fetchItems = async () => {
    const url =
      filter === "ALL"
        ? "/action-items"
        : `/action-items?status=${filter}`;

    const response = await api.get<ActionItem[]>(url);
    setList(response.data);
  };

  useEffect(() => {
    fetchItems();
  }, [filter, refreshKey]);

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Action Items</h2>

        <div className="space-x-2">
          {["ALL", "OPEN", "DONE"].map((value) => (
            <button
              key={value}
              onClick={() => setFilter(value as any)}
              className={`px-3 py-1 rounded text-sm ${
                filter === value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <p className="text-gray-500">No action items.</p>
      ) : (
        <div className="space-y-3">
          {list.map((item) => (
            <ActionItemRow
              key={item.id}
              item={item}
              onUpdated={fetchItems}
            />
          ))}
        </div>
      )}
    </div>
  );
}
