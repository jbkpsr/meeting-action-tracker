import { useState } from "react";
import TranscriptForm from "../components/TranscriptForm";
import ActionItemList from "../components/ActionItemList";
import HistoryPanel from "../components/HistoryPanel";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <TranscriptForm onProcessed={triggerRefresh} />
      <ActionItemList refreshKey={refreshKey} />
      <HistoryPanel refreshKey={refreshKey} />
    </div>
  );
}
