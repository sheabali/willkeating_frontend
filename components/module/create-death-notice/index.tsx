"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useCreateObituariesMutation } from "@/redux/api/obituariesApi";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface DeathNoticeFormData {
  name: string;
  dateOfBirth: string;
  dateOfPassing: string;
  location: string;
  shortStory: string;
  image?: File;
}

export function DeathNoticeForm() {


  const router = useRouter()

  const [preview, setPreview] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [createDeathNotice, { isLoading }] = useCreateObituariesMutation();

  const {
    register,
    handleSubmit,
    // watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<DeathNoticeFormData>({
    defaultValues: {
      name: "",
      dateOfBirth: "",
      dateOfPassing: "",
      location: "",
      shortStory: "",
    },
  });

  // const image = watch("image");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 1024 * 1024; // 1MB

    if (!validTypes.includes(file.type)) {
      alert("Please upload a JPG, JPEG, or PNG file");
      return;
    }

    if (file.size > maxSize) {
      alert("File size must be less than 1MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setValue("image", file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: DeathNoticeFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append(
      "dateOfBirth",
      format(new Date(data.dateOfBirth), "yyyy-MM-dd"),
    );
    formData.append(
      "dateOfPassing",
      format(new Date(data.dateOfPassing), "yyyy-MM-dd"),
    );
    formData.append("location", data.location);
    formData.append("story", data.shortStory);
    if (data.image) {
      formData.append("images", data.image);
    }

    try {
      await createDeathNotice(formData).unwrap();
      toast.success("Death notice created successfully!");
      router.push('/obituaries-notices')
    } catch (error) {
      console.error(error);
      toast.error("Failed to create death notice");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container mx-auto w-full rounded-3xl bg-[#f0f0ff] p-8 my-12"
    >
      <h1 className="mb-8 text-[20px] font-semibold text-[#14261C]">
        Create Death Notice
      </h1>

      <div className="mb-6">
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Name
        </label>
        <Input
          {...register("name", { required: "Name is required" })}
          id="name"
          placeholder="Patrick Joseph O'Connor"
          className="w-full bg-white py-6 rounded-3xl"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <label
            htmlFor="dateOfBirth"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Date of Birth
          </label>
          <Controller
            control={control}
            name="dateOfBirth"
            rules={{ required: "Date of birth is required" }}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white py-6 rounded-3xl",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(new Date(field.value), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date?.toISOString())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="dateOfPassing"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Date of Passing
          </label>
          <Controller
            control={control}
            name="dateOfPassing"
            rules={{ required: "Date of passing is required" }}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white py-6 rounded-3xl",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(new Date(field.value), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date?.toISOString())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.dateOfPassing && (
            <p className="mt-1 text-sm text-red-600">
              {errors.dateOfPassing.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="location"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Location
          </label>
          <Input
            {...register("location", { required: "Location is required" })}
            id="location"
            placeholder="Cork, Ireland"
            className="w-full bg-white py-6 rounded-3xl"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">
              {errors.location.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label
          htmlFor="shortStory"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Short Story
        </label>
        <textarea
          {...register("shortStory")}
          id="shortStory"
          placeholder="Write something..."
          className="h-32 w-full rounded-3xl border border-slate-300 bg-white px-4 py-6 text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 resize-none"
        />
      </div>

      {/* Upload Image */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Upload Image
        </label>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center rounded-3xl border-2 border-dashed py-12 transition-colors ${isDragActive
            ? "border-slate-400 bg-slate-50"
            : "border-slate-300 bg-white"
            }`}
        >
          {preview ? (
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-32 w-32 overflow-hidden rounded-lg">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Change Image
              </button>
            </div>
          ) : (
            <>
              <Upload className="mb-3 h-12 w-12 text-slate-400" />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[#0EA5E9] font-medium hover:underline"
              >
                Click to upload
              </button>
              <span className="mx-2 text-slate-500">or drag and drop</span>
              <p className="text-xs text-slate-400">
                JPG, JPEG, PNG less than 1MB
              </p>
            </>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-[200px] rounded-full bg-primary px-8 py-6 font-semibold text-white hover:bg-primary/90"
      >
        {isLoading ? <Spinner /> : "Create Death Notice"}
      </Button>
    </form>
  );
}
