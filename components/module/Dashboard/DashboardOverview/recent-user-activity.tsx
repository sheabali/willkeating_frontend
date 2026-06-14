"use client";

interface Activity {
  id: string;
  userName: string;
  action: string;
  timeAgo: string;
  initials: string;
  avatarColor?: string;
}

interface RecentUserActivityProps {
  activities?: Activity[];
}

const defaultActivities: Activity[] = [
  {
    id: "1",
    userName: "John Smith",
    action: "Booked etodos",
    timeAgo: "5 min ago",
    initials: "JS",
    avatarColor: "bg-amber-200",
  },
  {
    id: "2",
    userName: "Emma Wilson",
    action: "Cancelled booking #92",
    timeAgo: "12 min ago",
    initials: "EW",
    avatarColor: "bg-blue-200",
  },
  {
    id: "3",
    userName: "New Provider",
    action: "Registration pending approval",
    timeAgo: "25 min ago",
    initials: "NP",
    avatarColor: "bg-green-200",
  },
  {
    id: "4",
    userName: "Michael Brown",
    action: "Cancelled booking #892",
    timeAgo: "1 hour ago",
    initials: "MB",
    avatarColor: "bg-purple-200",
  },
  {
    id: "5",
    userName: "Sarah Davis",
    action: "Left 5-star review",
    timeAgo: "3 hours ago",
    initials: "SD",
    avatarColor: "bg-pink-200",
  },
];

const getAvatarInitialColors = (
  initials: string,
): { bg: string; text: string } => {
  const colorMap: Record<string, { bg: string; text: string }> = {
    JS: { bg: "bg-amber-100", text: "text-amber-700" },
    EW: { bg: "bg-blue-100", text: "text-blue-700" },
    NP: { bg: "bg-green-100", text: "text-green-700" },
    MB: { bg: "bg-purple-100", text: "text-purple-700" },
    SD: { bg: "bg-pink-100", text: "text-pink-700" },
  };
  return colorMap[initials] || { bg: "bg-gray-100", text: "text-gray-700" };
};

export function RecentUserActivity({
  activities = defaultActivities,
}: RecentUserActivityProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Recent User Activity
      </h2>

      <div className="space-y-4">
        {activities.map((activity) => {
          const avatarColors = getAvatarInitialColors(activity.initials);
          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 pb-4 last:pb-0 border-b border-gray-100 last:border-b-0"
            >
              {/* Avatar */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0 ${avatarColors.bg}`}
              >
                <span className={`text-sm font-semibold ${avatarColors.text}`}>
                  {activity.initials}
                </span>
              </div>

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.userName}{" "}
                  <span className="font-normal text-gray-600">
                    {activity.action}
                  </span>
                </p>
                <p className="mt-1 text-xs text-gray-500">{activity.timeAgo}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
