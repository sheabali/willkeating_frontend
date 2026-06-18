"use client";

import { useCommentsMemorialMutation } from "@/redux/api/memoryApi";
import { useState } from "react";

interface Props {
  memorialId: string;
}

export default function MemorialCommentForm({ memorialId }: Props) {
  const [newComment, setNewComment] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [createComment, { isLoading }] = useCommentsMemorialMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    try {
      const formData = new FormData();

      formData.append("text", newComment);

      if (selectedImage) {
        formData.append("images", selectedImage);
      }

      const res = await createComment({
        id: memorialId,
        data: formData,
      }).unwrap();

      console.log("Success:", res);

      setNewComment("");
      setSelectedImage(null);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write your comment..."
        className="w-full rounded-md border p-3"
        rows={4}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            setSelectedImage(file);
          }
        }}
      />

      {selectedImage && (
        <p className="text-sm text-gray-500">Selected: {selectedImage.name}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-md bg-blue-600 px-4 py-2 text-white"
      >
        {isLoading ? "Submitting..." : "Submit Comment"}
      </button>
    </form>
  );
}
