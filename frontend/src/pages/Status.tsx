import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function Status() {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const response = await api.get("/health");
      setStatus(response.data);
    };

    fetchStatus();
  }, []);

  if (!status) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">
        System Status
      </h2>

      <div className="space-y-3">
        <p>API: {status.status}</p>
        <p>Database: {status.database}</p>
        <p>LLM: {status.llm}</p>
      </div>
    </div>
  );
}
