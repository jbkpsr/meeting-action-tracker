export type ActionStatus = "OPEN" | "DONE";

export interface Transcript {
  id: string;
  content: string;
  created_at: string;
}

export interface ActionItem {
  id: string;
  task: string;
  owner: string | null;
  due_date: string | null;
  status: ActionStatus;
  transcript_id: string;
  created_at: string;
}

export interface TranscriptResponse {
  transcript: Transcript;
  actionItems: ActionItem[];
}
