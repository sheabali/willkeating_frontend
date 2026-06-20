/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MoreVertical, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteCommentMutation } from "@/redux/api/profileApi";

import { CommentSection } from "../../Memories/comment-section";
import { ImageGallery } from "./image-gallery";

interface PostCardProps {
  post: any;
}

export function PostCard({ post }: PostCardProps) {
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    // console.log("comment", post);

    // console.log("id", post.id);

    try {
      await deleteComment(post.id).unwrap();
      toast.success("Post deleted successfully");
      setShowDeleteDialog(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete post.");
      console.error("Failed to delete post:", err);
    }
  };

  return (
    <article className="rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      {/* Header */}
      <div className="border-b border-gray-100 px-4 py-4 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0 overflow-hidden rounded-full bg-gray-100">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={500}
                height={500}
                className="h-[50px] w-[50px] object-cover"
              />
            </div>

            <div>
              <p className="text-[24px] text-[#052858]">{post.author.name}</p>
              <p className="text-[14px] font-medium text-[#5B5C57]">
                {post.postedAt}
              </p>
            </div>
          </div>

          {/* Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                <MoreVertical className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                disabled={isDeleting}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete post?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete your post. This action cannot be
                  undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-600"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 sm:px-6">
        <p className="text-sm leading-relaxed text-[#052858] sm:text-[20px]">
          {post.description}
        </p>
      </div>

      {/* Image Gallery */}
      {post.images?.length > 0 && (
        <div className="px-4 py-4 sm:px-6">
          <ImageGallery images={post.images} layout={post.imageLayout} />
        </div>
      )}

      {/* Comments Section */}
      <CommentSection comments={post.comments} />
    </article>
  );
}
