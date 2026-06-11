"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FuneralFormData {
  name: string;
  dateOfBirth: string;
  dateOfPassing: string;
  funeralLocation: string;
  funeralDate: string;
  funeralTime: string;
  funeralTimeFormat: "AM" | "PM";
  image: FileList;
}

export default function FuneralNoticeForm() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FuneralFormData>({
    defaultValues: {
      funeralTimeFormat: "PM",
    },
  });

  const imageFiles = watch("image");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
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
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
      // Create a DataTransfer object to set the file input
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(files[0]);
      const input = document.getElementById("image-input") as HTMLInputElement;
      if (input) {
        input.files = dataTransfer.files;
      }
    }
  };

  const onSubmit = (data: FuneralFormData) => {
    console.log("Form data:", data);
    // Here you would typically send the data to a server
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
            Upload Image
          </Label>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center bg-white transition ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input
              id="image-input"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              className="hidden"
              {...register("image")}
              onChange={handleImageChange}
            />
            {uploadedImage ? (
              <div className="space-y-2">
                <div className="w-40 h-40 mx-auto rounded overflow-hidden">
                  <Image
                    src={uploadedImage}
                    alt="Uploaded"
                    width={300}
                    height={300}
                    className="w-40 h-40 object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Image uploaded successfully
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setUploadedImage(null);
                    const input = document.getElementById(
                      "image-input",
                    ) as HTMLInputElement;
                    if (input) input.value = "";
                  }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Change image
                </button>
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
                  JPG, JPEG, PNG less than 10MB
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-start pt-4">
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white font-medium px-8"
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
