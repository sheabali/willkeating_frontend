import {
  ModerationReport,
  ModerationReportViewModel,
} from "@/src/types/moderation";

const FALLBACK_AVATAR = "/images/default-avatar.png";

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Unknown time";

  let duration = (date.getTime() - Date.now()) / 1000;
  const divisions: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
    { amount: 60, unit: "seconds" },
    { amount: 60, unit: "minutes" },
    { amount: 24, unit: "hours" },
    { amount: 7, unit: "days" },
    { amount: 4.34524, unit: "weeks" },
    { amount: 12, unit: "months" },
    { amount: Infinity, unit: "years" },
  ];

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  for (const { amount, unit } of divisions) {
    if (Math.abs(duration) < amount)
      return rtf.format(Math.round(duration), unit);
    duration /= amount;
  }
  return rtf.format(Math.round(duration), "years");
}

function getReportedInLabel(report: ModerationReport): string {
  const creator = report.memorial?.createdBy?.fullName ?? "Unknown user";
  switch (report.contentType) {
    case "MEMORIAL":
      return `${creator}'s Memorial`;
    case "COMMENT":
      return `Comment on ${creator}'s Memorial`;
    default:
      return report.contentType ?? "Unknown";
  }
}

function getReportContent(
  report: ModerationReport,
): ModerationReportViewModel["content"] {
  const hasText = Boolean(report.reportedContent?.trim());
  const firstImage = report.memorial?.images?.[0];

  if (hasText) {
    return { type: "text", text: report.reportedContent };
  }
  if (firstImage) {
    return {
      type: "image",
      imageUrl: firstImage,
      imageCaption: report.reason || "Reported image attachment",
    };
  }
  return { type: "text", text: report.reason || "No content available." };
}

export function mapModerationReportToViewModel(
  report: ModerationReport,
): ModerationReportViewModel {
  return {
    id: report.id,
    reportedIn: getReportedInLabel(report),
    timestamp: formatRelativeTime(report.createdAt),
    content: getReportContent(report),
    reportedBy: {
      name: report.user?.fullName ?? "Unknown reporter",
      avatar: report.user?.image || FALLBACK_AVATAR,
      role: report.user?.role ?? "User",
    },
  };
}

export function mapModerationReportsToViewModels(
  reports: ModerationReport[] | undefined | null,
): ModerationReportViewModel[] {
  return reports?.map(mapModerationReportToViewModel) ?? [];
}
