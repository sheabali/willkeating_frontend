"use client";

import { Heart, Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Comment {
  author: {
    name: string;
    avatar: string;
  };
  text: string;
}

interface CommentSectionProps {
  comments: Comment[];
  currentUserAvatar?: string;
}

export function CommentSection({
  comments,
  currentUserAvatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop",
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const commentCount = comments.filter((c) => c.text).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      console.log("[v0] New comment submitted:", newComment);
      setNewComment("");
    }
  };

  return (
    <div className="border-t border-gray-100 px-4 py-4 sm:px-6">
      {/* Comment Avatars */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex -space-x-2">
          {comments.slice(0, 4).map((comment, index) => (
            <div
              key={index}
              className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white bg-gray-100"
              title={comment.author.name}
            >
              <Image
                src={comment.author.avatar}
                alt={comment.author.name}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <button className="text-gray-400 hover:text-red-500 transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.map(
          (comment, index) =>
            comment.text && (
              <div key={index} className="flex gap-3">
                <div className="relative w-8 h-8 shrink-0 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-900">
                      {comment.author.name}
                    </span>{" "}
                    <span className="text-gray-700">{comment.text}</span>
                  </p>
                </div>
              </div>
            ),
        )}
      </div>

      {/* Comment Count */}
      {commentCount > 0 && (
        <p className="text-xs text-gray-500 mt-3">
          {commentCount} comment{commentCount !== 1 ? "s" : ""}
        </p>
      )}

      {/* Comment Input Field */}
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex gap-3 items-center border-2 border-gray-100 rounded-lg p-3 bg-white"
      >
        <div className="relative w-8 h-8 shrink-0 rounded-full overflow-hidden bg-gray-100">
          <Image
            src={currentUserAvatar}
            alt="Your avatar"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write something"
          className="flex-1 text-sm bg-transparent outline-none text-gray-900 placeholder-gray-500"
        />
        <button
          type="submit"
          className="text-primary hover:text-primary/80 transition-colors shrink-0"
          disabled={!newComment.trim()}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
