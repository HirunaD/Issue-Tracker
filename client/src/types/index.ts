export type Priority = "Low" | "Medium" | "High";
export type Status = "Open" | "In Progress" | "Resolved" | "Closed";

export interface Issue {
  _id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  severity?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IssueStats {
  _id: Status;
  count: number;
}

export interface ApiErrorResponse {
  response?: {
    data?: {
      msg?: string;
      message?: string;
    };
  };
}
