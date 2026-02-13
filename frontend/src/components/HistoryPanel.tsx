import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { Transcript } from "../types";
import dayjs from "dayjs";

interface Props {
  refreshKey: number;
}

export default function HistoryPanel({ refreshKey }: Props) {
  const [history, setHistory] = useState<Transcript[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await api.get<Transcript[]>("/transcripts");
      setHistory(response.data);
    };

    fetchHistory();
  }, [refreshKey]);

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">
        Last 5 Transcripts
      </h2>

      <ul className="space-y-3">
        {history.map((t) => (
          <li key={t.id} className="border p-3 rounded">
            <p className="text-sm text-gray-600">
              {dayjs(t.created_at).format("DD MMM YYYY HH:mm")}
            </p>
            <p className="truncate">{t.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
