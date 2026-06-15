"use client";

import { useState } from "react";
import {
  ReviewContentItem,
  ReviewReportedContent,
} from "./review-reported-content";

const mockData: ReviewContentItem[] = [
  {
    id: "1",
    reportedIn: "Elsa Thorne's Memorial",
    timestamp: "2 hours ago",
    content: {
      type: "text",
      text: '"...and honestly, he was a bitter old man who never deserved the respect he demanded from us. I\'m glad he is finally gone to the rest of us can breathe. This site is a joke for even hosting this."',
    },
    reportedBy: {
      name: "Sarah Jenkins",
      avatar: "/images/user_4.jpg",
      role: "Regular User",
    },
    onRemove: (id) => console.log("Remove:", id),
    onDismiss: (id) => console.log("Dismiss:", id),
  },
  {
    id: "2",
    reportedIn: "Eleanor Vance's Legacy",
    timestamp: "5 hours ago",
    content: {
      type: "image",
      imageUrl: "/images/user_4.jpg",
      imageCaption:
        '"Need help with home repairs? Call Jack at 555-0123 for the best rates in town. We also do garden maintenance"',
    },
    reportedBy: {
      name: "Anonymous AI Guard",
      avatar: "/images/user_4.jpg",
      role: "System Flag",
    },
    onRemove: (id) => console.log("Remove:", id),
    onDismiss: (id) => console.log("Dismiss:", id),
  },
  {
    id: "3",
    reportedIn: "Marcus Hall Memorial",
    timestamp: "8 hours ago",
    content: {
      type: "text",
      text: '"I remember Marcus used to live at 442 West Oak Street. If anyone wants to drop off flowers for his family, they are still there, phone number 555-892-3341. RIP Marcus."',
    },
    reportedBy: {
      name: "David Chen",
      avatar: "/images/user_4.jpg",
      role: "Premium Member",
    },
    onRemove: (id) => console.log("Remove:", id),
    onDismiss: (id) => console.log("Dismiss:", id),
  },
];

export default function ModerationPage() {
  const [items, setItems] = useState<ReviewContentItem[]>(mockData);

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDismiss = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updatedItems = items.map((item) => ({
    ...item,
    onRemove: () => handleRemove(item.id),
    onDismiss: () => handleDismiss(item.id),
  }));

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <ReviewReportedContent
          title="Review Reported Content"
          pendingCount={updatedItems.length}
          lastUpdated="2 mins ago"
          items={updatedItems}
        />
      </div>
    </main>
  );
}
