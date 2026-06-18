/* eslint-disable @typescript-eslint/no-explicit-any */
function timeAgo(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(dateString).toLocaleDateString();
}

function mapComment(comment: any): any {
  return {
    id: comment.id,
    author: {
      name: comment.user?.fullName ?? "Anonymous",
      avatar: comment.user?.image || "/images/user.png",
    },
    text: comment.text ?? "",
    images: comment.images ?? [],
    postedAt: timeAgo(comment.createdAt),
  };
}

export function mapMemorialToMemory(memorial: any): any {
  const images: string[] = memorial.images ?? [];

  return {
    id: memorial.id,
    author: {
      name: memorial.createdBy?.fullName ?? "Anonymous",
      avatar: memorial.createdBy?.image || "/images/user.png",
    },
    postedAt: timeAgo(memorial.createdAt),
    description: memorial.story ?? "",
    images,
    imageLayout: images.length > 1 ? "grid" : "single",
    comments: (memorial.comments ?? []).map(mapComment),
  };
}
export function mapMemorialsToMemories(memorials: any[]): any[] {
  return (memorials ?? []).map(mapMemorialToMemory);
}
