// lib/mappers/death-notice.mapper.ts

import { DeathNoticeDto, DeathNoticeViewModel } from "./death-notice.types";

function formatNoticeDate(dateString: string | undefined | null): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function calculateAgeAtPassing(
  dateOfBirth: string | undefined | null,
  dateOfPassing: string | undefined | null,
): number | null {
  if (!dateOfBirth || !dateOfPassing) return null;

  const birth = new Date(dateOfBirth);
  const passing = new Date(dateOfPassing);
  if (Number.isNaN(birth.getTime()) || Number.isNaN(passing.getTime()))
    return null;

  let age = passing.getFullYear() - birth.getFullYear();
  const monthDiff = passing.getMonth() - birth.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && passing.getDate() < birth.getDate())
  ) {
    age -= 1;
  }

  return age >= 0 ? age : null;
}

function getInitials(fullName: string | undefined | null): string {
  if (!fullName) return "?";

  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function mapDeathNoticeToViewModel(
  dto: DeathNoticeDto,
): DeathNoticeViewModel {
  return {
    id: dto.id,
    name: dto.name?.trim() || "Unnamed notice",
    dateOfBirthFormatted: formatNoticeDate(dto.dateOfBirth),
    dateOfPassingFormatted: formatNoticeDate(dto.dateOfPassing),
    ageAtPassing: calculateAgeAtPassing(dto.dateOfBirth, dto.dateOfPassing),
    location: dto.location?.trim() || "",
    story: dto.story?.trim() || "",
    portraitUrl: dto.images?.[0] ?? null,
    status: dto.status ?? "DRAFT",
    isPublished: dto.status === "PUBLISHED",
    publishedAtFormatted: formatNoticeDate(dto.createdAt),
    author: {
      name: dto.createdBy?.fullName?.trim() || "Unknown",
      email: dto.createdBy?.email ?? "",
      phone: dto.createdBy?.phone ?? "",
      avatarUrl: dto.createdBy?.image ?? null,
      initials: getInitials(dto.createdBy?.fullName),
    },
  };
}
