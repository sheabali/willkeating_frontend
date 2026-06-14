export interface Memory {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  postedAt: string;
  description: string;
  images: string[];
  imageLayout: "grid-2x2" | "grid-2col" | "grid-3col" | "single";
  comments: {
    author: {
      name: string;
      avatar: string;
    };
    text: string;
  }[];
  category?: string;
}

export type MemoryFilter = "all" | "recent" | "popular";
