import { Memory } from "./types";

export const MOCK_MEMORIES: Memory[] = [
  {
    id: "1",
    author: {
      name: "James Williams",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop",
    },
    postedAt: "Posted 3 hours ago",
    description:
      "I will always remember Dad teaching us how to ride our bikes in the park every Sunday morning. His patience and encouragement gave us confidence throughout our lives.",
    images: [
      "/images/Rectangle 14 (2).png",
      "/images/Rectangle 14.png",
      "/images/Rectangle 12.png",
      "/images/Rectangle 13 (3).png",
    ],
    imageLayout: "grid-2x2",
    comments: [
      {
        author: {
          name: "Alex Hales",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop",
        },
        text: "So touched by your memories with kids. You brought them a lot of memories.",
      },
      {
        author: {
          name: "H. Robinhood",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop",
        },
        text: "Wonderful! What a beautiful memory. Thank you for sharing this.",
      },
      {
        author: {
          name: "Carry D.",
          avatar:
            "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=32&h=32&fit=crop",
        },
        text: "Such a beautiful memory. Thank you for sharing this.",
      },
      {
        author: {
          name: "Billy something",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop",
        },
        text: "",
      },
    ],
    category: "family",
  },
  {
    id: "2",
    author: {
      name: "Michael O'Brien",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=48&h=48&fit=crop",
    },
    postedAt: "Posted 1 hour ago",
    description:
      "One of my favorite memories of James was our annual fishing trip. No matter the weather, he always managed to make everyone laugh and enjoy the day.",
    images: [
      "/images/rectangle_15.png",
      "/images/Rectangle 12 (1).png",
      "/images/Rectangle 14 (1).png",
      "/images/Rectangle 13 (2).png",
    ],
    imageLayout: "grid-2x2",
    comments: [
      {
        author: {
          name: "Alex Hales",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop",
        },
        text: "So touched by your memories with kids. You brought them a lot of memories.",
      },
      {
        author: {
          name: "H. Robinhood",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop",
        },
        text: "Wonderful! What a beautiful memory. Thank you for sharing this.",
      },
      {
        author: {
          name: "Carry D.",
          avatar:
            "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=32&h=32&fit=crop",
        },
        text: "Such a beautiful memory. Thank you for sharing this.",
      },
      {
        author: {
          name: "Billy something",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop",
        },
        text: "",
      },
    ],
    category: "adventure",
  },
  {
    id: "3",
    author: {
      name: "Emma Sullivan",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop",
    },
    postedAt: "Posted 1 week ago",
    description:
      "Mum's garden was her pride and joy. Every flower she planted seemed to blossom under her care. Walking through her garden today brought back so many wonderful memories.",
    images: [
      "/images/Rectangle 12 (1).png",
      "/images/Rectangle 14 (1).png",
      "/images/Rectangle 13 (2).png",
    ],
    imageLayout: "grid-2col",
    comments: [
      {
        author: {
          name: "Alex Hales",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop",
        },
        text: "So touched by your memories with kids. You brought them a lot of memories.",
      },
      {
        author: {
          name: "H. Robinhood",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop",
        },
        text: "Wonderful! What a beautiful memory. Thank you for sharing this.",
      },
      {
        author: {
          name: "Carry D.",
          avatar:
            "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=32&h=32&fit=crop",
        },
        text: "Such a beautiful memory. Thank you for sharing this.",
      },
      {
        author: {
          name: "Billy something",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop",
        },
        text: "",
      },
    ],
    category: "nature",
  },
];
