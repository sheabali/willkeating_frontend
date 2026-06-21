export type DeathNoticeStatus = "PUBLISHED" | "DRAFT" | "ARCHIVED" | "PENDING";

export interface DeathNoticeAuthorDto {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  image: string;
}

/**
 * Raw shape returned by GET /death-notice/:id
 */
export interface DeathNoticeDto {
  id: string;
  createdUserId: string;
  name: string;
  dateOfBirth: string;
  dateOfPassing: string;
  location: string;
  story: string;
  images: string[];
  status: DeathNoticeStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: DeathNoticeAuthorDto;
}

export interface DeathNoticeApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: DeathNoticeDto;
  stats: Record<string, unknown>;
}

/**
 * Normalized shape the UI actually consumes. Every field is pre-formatted
 * or defaulted so DeathNoticeDetail never has to null-check raw API fields.
 */
export interface DeathNoticeViewModel {
  id: string;
  name: string;
  dateOfBirthFormatted: string;
  dateOfPassingFormatted: string;
  ageAtPassing: number | null;
  location: string;
  story: string;
  portraitUrl: string | null;
  status: DeathNoticeStatus;
  isPublished: boolean;
  publishedAtFormatted: string;
  author: {
    name: string;
    email: string;
    phone: string;
    avatarUrl: string | null;
    initials: string;
  };
}
