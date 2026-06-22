"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "@/components/ui/loading";
import { useCreateFuneralMutation } from "@/redux/api/funeralApi";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FuneralFormData {
  name: string;
  dateOfBirth: string;
  dateOfPassing: string;
  funeralLocation: string;
  funeralDate: string;
  funeralTime: string;
  funeralTimeFormat: "AM" | "PM";
}

const MAX_IMAGES = 5;
const MAX_SIZE_MB = 10;

export default function FuneralNoticeForm() {
  const router = useRouter();

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [createFuneral, { isLoading }] = useCreateFuneralMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FuneralFormData>({
    defaultValues: {
      funeralTimeFormat: "PM",
    },
  });

  const addFiles = (incoming: File[]) => {
    setImageError(null);

    const validFiles = incoming.filter((file) => {
      const isValidType = ["image/jpeg", "image/jpg", "image/png"].includes(
        file.type,
      );
      const isValidSize = file.size <= MAX_SIZE_MB * 1024 * 1024;
      return isValidType && isValidSize;
    });

    if (validFiles.length < incoming.length) {
      setImageError(`Only JPG/PNG files under ${MAX_SIZE_MB}MB are allowed.`);
    }

    const combined = [...images, ...validFiles];

    if (combined.length > MAX_IMAGES) {
      setImageError(`You can upload up to ${MAX_IMAGES} images.`);
    }

    const trimmed = combined.slice(0, MAX_IMAGES);
    setImages(trimmed);

    trimmed.forEach((file, index) => {
      if (imagePreviews[index]) return; // already have a preview for existing files
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => {
          const next = [...prev];
          next[index] = reader.result as string;
          return next;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      addFiles(Array.from(files));
    }
    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      addFiles(Array.from(files));
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FuneralFormData) => {
    setSubmitStatus("idle");
    setImageError(null);

    if (images.length === 0) {
      setImageError("Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("dateOfBirth", data.dateOfBirth);
    formData.append("dateOfPassing", data.dateOfPassing);
    formData.append("funeralLocation", data.funeralLocation);
    formData.append("funeralDate", data.funeralDate);
    formData.append(
      "funeralTime",
      `${data.funeralTime} ${data.funeralTimeFormat}`,
    );
    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await createFuneral(formData).unwrap();
      setSubmitStatus("success");
      reset({ funeralTimeFormat: "PM" } as FuneralFormData);
      setImages([]);
      setImagePreviews([]);
      toast.success("Funeral notice created successfully.");
      router.push("/funeral-notices");
    } catch (err) {
      toast.error("Failed to create funeral notice.");
      setSubmitStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto">
      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <Label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 mb-1 block"
          >
            Name
          </Label>
          <Input
            id="name"
            placeholder="Patrick Joseph O'Connor"
            className="w-full py-6 px-4 bg-white rounded-3xl"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        {/* Date of Birth and Date of Passing */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="dateOfBirth"
              className="text-sm font-medium text-gray-700 mb-1 block"
            >
              Date of Birth
            </Label>
            <Input
              id="dateOfBirth"
              className="w-full py-6 px-4 bg-white rounded-3xl"
              type="date"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
            />
            {errors.dateOfBirth && (
              <span className="text-red-500 text-sm">
                {errors.dateOfBirth.message}
              </span>
            )}
          </div>
          <div>
            <Label
              htmlFor="dateOfPassing"
              className="text-sm font-medium text-gray-700 mb-1 block"
            >
              Date of Passing
            </Label>
            <Input
              id="dateOfPassing"
              type="date"
              className="w-full py-6 px-4 bg-white rounded-3xl"
              {...register("dateOfPassing", {
                required: "Date of passing is required",
              })}
            />
            {errors.dateOfPassing && (
              <span className="text-red-500 text-sm">
                {errors.dateOfPassing.message}
              </span>
            )}
          </div>
        </div>

        {/* Funeral Details */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label
              htmlFor="funeralLocation"
              className="text-sm font-medium text-gray-700 mb-1 block"
            >
              Funeral Location
            </Label>
            <Input
              id="funeralLocation"
              placeholder="Cork, Ireland"
              className="w-full py-6 px-4 bg-white rounded-3xl"
              {...register("funeralLocation", {
                required: "Location is required",
              })}
            />
            {errors.funeralLocation && (
              <span className="text-red-500 text-sm">
                {errors.funeralLocation.message}
              </span>
            )}
          </div>
          <div>
            <Label
              htmlFor="funeralDate"
              className="text-sm font-medium text-gray-700 mb-1 block"
            >
              Funeral Date
            </Label>
            <Input
              id="funeralDate"
              className="w-full py-6 px-4 bg-white rounded-3xl"
              type="date"
              {...register("funeralDate", {
                required: "Funeral date is required",
              })}
            />
            {errors.funeralDate && (
              <span className="text-red-500 text-sm">
                {errors.funeralDate.message}
              </span>
            )}
          </div>
          <div>
            <Label
              htmlFor="funeralTime"
              className="text-sm font-medium text-gray-700 mb-1 block"
            >
              Funeral Time
            </Label>
            <div className="flex gap-2">
              <Input
                id="funeralTime"
                placeholder="3:00"
                {...register("funeralTime", { required: "Time is required" })}
                className="flex-1 py-6 px-4 bg-white rounded-3xl"
              />
              <select
                {...register("funeralTimeFormat")}
                className="w-16 px-2 py-2 border  bg-white rounded-3xl border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            {errors.funeralTime && (
              <span className="text-red-500 text-sm">
                {errors.funeralTime.message}
              </span>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div className="">
          <Label className="text-sm font-medium text-gray-700 mb-1 block">
            Upload Images
          </Label>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center bg-white transition ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
          >
            <input
              id="image-input"
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />

            {imagePreviews.length > 0 ? (
              <div className="space-y-3">
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {imagePreviews.map((src, index) => (
                    <div
                      key={index}
                      className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-200"
                    >
                      <Image
                        src={src}
                        alt={`Upload preview ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-1"
                        aria-label="Remove image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  {images.length} of {MAX_IMAGES} images added
                </p>
                {images.length < MAX_IMAGES && (
                  <label
                    htmlFor="image-input"
                    className="text-sm text-blue-600 hover:underline cursor-pointer"
                  >
                    Add more images
                  </label>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="w-8 h-8 mx-auto text-gray-400" />
                <p className="text-blue-600 font-medium cursor-pointer">
                  <label htmlFor="image-input" className="cursor-pointer">
                    Click to upload
                  </label>
                </p>
                <p className="text-gray-500 text-sm">or drag and drop</p>
                <p className="text-gray-400 text-xs">
                  JPG, JPEG, PNG less than {MAX_SIZE_MB}MB, up to {MAX_IMAGES}{" "}
                  images
                </p>
              </div>
            )}
          </div>
          {imageError && (
            <span className="text-red-500 text-sm block mt-1">
              {imageError}
            </span>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-start pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-[200px] py-6 bg-primary hover:bg-primary/90 text-white font-medium px-8"
          >
            {isLoading ? <Loading /> : "Save"}
          </Button>
        </div>
      </div>
    </form>
  );
}
