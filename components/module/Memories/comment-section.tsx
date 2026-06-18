/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCommentsMemorialMutation } from "@/redux/api/memoryApi";
import { Heart, Paperclip, Send, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface Comment {
  author: {
    name: string;
    avatar: string;
  };
  text: string;
}

interface CommentSectionProps {
  memorialId: string;
  comments: Comment[];
  currentUserAvatar?: string;
}

const FALLBACK_AVATAR = "/images/user.png";

export function CommentSection({
  memorialId,
  comments,
  currentUserAvatar = FALLBACK_AVATAR,
}: CommentSectionProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [createComment, { isLoading }] = useCommentsMemorialMutation();

  const commentCount = comments.filter((c) => c.text).length;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB");
      return;
    }

    setError(null);
    setSelectedImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim() && !selectedImage) return;

    try {
      setError(null);
      const formData = new FormData();
      formData.append("text", newComment);

      if (selectedImage) {
        formData.append("images", selectedImage);
      }

      const res = (await createComment({
        id: memorialId,
        data: formData,
      }).unwrap()) as any;

      if (res.success) {
        setNewComment("");
        setSelectedImage(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
      setError("Couldn't post your comment. Please try again.");
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
                src={comment.author.avatar || FALLBACK_AVATAR}
                alt={comment.author.name}
                width={100}
                height={100}
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
                    src={comment.author.avatar || FALLBACK_AVATAR}
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

      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}

      {/* Selected image preview */}
      {selectedImage && (
        <div className="mt-3 flex items-center gap-2">
          <div className="relative w-12 h-12 rounded-md overflow-hidden border border-gray-200">
            <Image
              src={URL.createObjectURL(selectedImage)}
              alt="Selected attachment"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedImage(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Comment Input Field */}
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex gap-3 items-center border-2 border-gray-100 rounded-lg p-3 bg-white"
      >
        <div className="relative w-8 h-8 shrink-0 rounded-full overflow-hidden bg-gray-100">
          <Image
            src={currentUserAvatar || FALLBACK_AVATAR}
            alt="Your avatar"
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write something"
          className="flex-1 text-sm bg-transparent outline-none text-gray-900 placeholder-gray-500"
          disabled={isLoading}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          disabled={isLoading}
        >
          <Paperclip className="w-5 h-5" />
        </button>
        <button
          type="submit"
          className="text-primary hover:text-primary/80 transition-colors shrink-0 disabled:opacity-40"
          disabled={(!newComment.trim() && !selectedImage) || isLoading}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
