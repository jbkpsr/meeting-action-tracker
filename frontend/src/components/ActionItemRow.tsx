import { useState } from "react";
import { api } from "../api/client";
import type { ActionItem } from "../types";
import dayjs from "dayjs";

interface Props {
  item: ActionItem;
  onUpdated: () => void;
}

export default function ActionItemRow({ item, onUpdated }: Props) {
  const [editing, setEditing] = useState(false);
  const [task, setTask] = useState(item.task);
  const [loading, setLoading] = useState(false);

  const toggleStatus = async () => {
    try {
      setLoading(true);

      await api.patch(`/action-items/${item.id}/status`, {
        status: item.status === "OPEN" ? "DONE" : "OPEN"
      });

      onUpdated();
    } catch {
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this action item?")) return;

    try {
      setLoading(true);
      await api.delete(`/action-items/${item.id}`);
      onUpdated();
    } catch {
      alert("Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await api.patch(`/action-items/${item.id}`, {
        task
      });

      setEditing(false);
      onUpdated();
    } catch {
      alert("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-3 rounded flex justify-between items-start">
      <div className="flex-1">
        {editing ? (
          <input
            className="border p-1 w-full mb-2"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        ) : (
          <p
            className={`font-medium ${
              item.status === "DONE" ? "line-through text-gray-400" : ""
            }`}
          >
            {item.task}
          </p>
        )}

        {item.owner && (
          <p className="text-sm text-gray-500">
            Owner: {item.owner}
          </p>
        )}

        {item.due_date && (
          <p className="text-sm text-gray-500">
            Due: {dayjs(item.due_date).format("DD MMM YYYY")}
          </p>
        )}
      </div>

      <div className="flex gap-2 ml-4">
        <button
          onClick={toggleStatus}
          disabled={loading}
          className="text-sm px-2 py-1 bg-gray-200 rounded"
        >
          {item.status === "OPEN" ? "Mark Done" : "Reopen"}
        </button>

        {editing ? (
          <button
            onClick={handleSave}
            disabled={loading}
            className="text-sm px-2 py-1 bg-green-500 text-white rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-sm px-2 py-1 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
        )}

        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-sm px-2 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
