import { useState } from "react";
import { api } from "../api/client";

interface Props {
  onProcessed: () => void;
}

export default function TranscriptForm({ onProcessed }: Props){
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError("Transcript cannot be empty");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await api.post("/transcripts", { content });

      setContent("");
      onProcessed();

      // Refresh action items after creation
      window.dispatchEvent(new Event("refreshActionItems"));

    } catch (err: any) {
      setError(
        err?.response?.data?.error || err?.message || "Failed to create transcript"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">
        Paste Meeting Transcript
      </h2>

      <textarea
        className="w-full border p-3 rounded mb-4"
        rows={6}
        placeholder="Paste transcript here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {error && (
        <p className="text-red-500 mb-3">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Processing..." : "Process Transcript"}
      </button>
    </div>
  );
}
