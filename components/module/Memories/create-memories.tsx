"use client";

import { Button } from "@/components/ui/button";
import { useCreateMemoryMutation } from "@/redux/api/memoryApi";

import { ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

interface MemoryFormData {
  text: string;
  images: File[];
}

const MAX_IMAGES = 4;
const MAX_SIZE_MB = 5;

const CreateMemories = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<MemoryFormData>({
    text: "",
    images: [],
  });
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [createMemory, { isLoading: isSaving }] = useCreateMemoryMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, text: e.target.value }));
  };

  const handleImageClick = () => {
    if (formData.images.length < MAX_IMAGES) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const remaining = MAX_IMAGES - formData.images.length;
    const accepted: File[] = [];
    const newPreviews: string[] = [];

    for (const file of files.slice(0, remaining)) {
      if (!file.type.startsWith("image/")) {
        alert(`"${file.name}" is not a valid image file`);
        continue;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        alert(`"${file.name}" exceeds the ${MAX_SIZE_MB}MB limit`);
        continue;
      }
      accepted.push(file);
    }

    if (!accepted.length) return;

    // Generate previews
    let loaded = 0;
    accepted.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        loaded++;
        if (loaded === accepted.length) {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...accepted],
          }));
          setPreviews((prev) => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input so the same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.text.trim()) {
      alert("Please write something");
      return;
    }

    const payload = new FormData();
    payload.append("story", formData.text.trim());
    formData.images.forEach((file) => {
      payload.append("images", file);
    });

    try {
      setIsSubmitting(true);
      await createMemory(payload).unwrap();
      toast.success("Memory saved successfully!");
      setFormData({ text: "", images: [] });
      setPreviews([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      textareaRef.current?.focus();
      router.push("/memories");
    } catch (error) {
      console.error("Error submitting memory:", error);
      toast.error("Failed to save memory. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.text.trim().length > 0;
  const isBusy = isSubmitting || isLoading;
  const canAddMore = formData.images.length < MAX_IMAGES;

  return (
    <div className="w-full container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight text-slate-900">
        Add a New Memory
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="rounded-lg bg-slate-100 p-6 transition-all duration-200 focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2">
          {/* Text Input */}
          <textarea
            ref={textareaRef}
            value={formData.text}
            onChange={handleTextChange}
            placeholder="Write something..."
            className="w-full h-40 bg-slate-100 text-slate-900 placeholder-slate-500 outline-none resize-none text-sm leading-relaxed"
            disabled={isBusy}
          />

          <div className="my-6 border-t border-slate-200" />

          {/* Image Previews */}
          {previews.length > 0 && (
            <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {previews.map((src, index) => (
                <div key={index} className="relative">
                  <Image
                    src={src}
                    alt={`Preview ${index + 1}`}
                    width={160}
                    height={160}
                    className="h-24 w-full rounded-md object-cover shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    disabled={isBusy}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white shadow-md transition-transform hover:scale-110 disabled:opacity-50"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Button */}
          {canAddMore && (
            <button
              type="button"
              onClick={handleImageClick}
              disabled={isBusy}
              className="flex flex-col items-center gap-2 rounded-lg p-4 transition-colors hover:bg-slate-200 disabled:opacity-50"
              aria-label="Upload images"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-slate-300 text-slate-500">
                <ImageIcon size={24} />
              </div>
              <span className="text-sm font-medium text-slate-600">
                {previews.length > 0
                  ? `Add more (${previews.length}/${MAX_IMAGES})`
                  : "Add Images"}
              </span>
            </button>
          )}

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden outline-none"
            aria-label="Select image files"
            disabled={isBusy}
          />
        </div>

        <Button
          type="submit"
          disabled={!isFormValid || isBusy}
          className="rounded-full w-[200px] py-6 bg-primary cursor-pointer px-8 font-medium text-white shadow-sm transition-all hover:bg-amber-600 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isBusy ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            "Upload Memory"
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreateMemories;
