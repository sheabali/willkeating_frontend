export type ModerationContentType = "MEMORIAL" | "COMMENT";
export type ModerationReportStatus = "PENDING" | "RESOLVED" | "DISMISSED";

export interface ModerationReportUser {
  id: string;
  fullName: string;
  email: string;
  image: string;
  role: string;
}

export interface ModerationReportMemorial {
  id: string;
  story?: string;
  images?: string[];
  createdBy?: { fullName: string };
}

export interface ModerationReport {
  id: string;
  reporterId: string;
  memorialId: string;
  commentId: string | null;
  reason: string;
  reportedContent: string;
  contentType: ModerationContentType;
  status: ModerationReportStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  user: ModerationReportUser;
  memorial: ModerationReportMemorial;
}

export interface GetModerationReportsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: { page: number; limit: number; total: number; totalPage: number };
  data: ModerationReport[];
  stats?: Record<string, unknown>;
}

export interface ModerationReportViewModel {
  id: string;
  reportedIn: string;
  timestamp: string;
  content: {
    type: "text" | "image";
    text?: string;
    imageUrl?: string;
    imageCaption?: string;
  };
  reportedBy: {
    name: string;
    avatar: string;
    role: string;
  };
}
