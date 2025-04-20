"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useApp } from "@/stores/useApp";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

function AddNew() {
  const router = useRouter();
  const { addProject } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [toolInput, setToolInput] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    tagline: string;
    projectUrl: string;
    videoUrl: string;
    logo: File | null;
    tools: string[];
  }>({
    name: "",
    tagline: "",
    projectUrl: "",
    videoUrl: "",
    logo: null,
    tools: [],
  });

  const openFile = () => fileRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error("File size exceeds the 10MB limit");
        return;
      }
      setPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, logo: file }));
    }
  };

  const clearPreview = () => {
    setPreview(null);
    setFormData((prev) => ({ ...prev, logo: null }));
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddTool = () => {
    if (toolInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        tools: [...prev.tools, toolInput.trim()],
      }));
      setToolInput("");
    }
  };

  const handleRemoveTool = (toolToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools.filter((tool) => tool !== toolToRemove),
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.tagline) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("tagline", formData.tagline);
    data.append("projectUrl", formData.projectUrl);
    data.append("videoUrl", formData.videoUrl);
    if (formData.logo) data.append("logo", formData.logo);
    
    data.append("tools", JSON.stringify(formData.tools));
    setIsAdding(true);
    await addProject(data);
    setIsAdding(false);
  };

  return (
    <div className="px-5">
      <div className="flex items-center gap-4 py-3">
        <Button
          variant="outline"
          className="rounded-lg"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-lg font-bold">Add Project</h1>
      </div>

      <Separator />

      <div className="flex flex-col gap-4 py-5">
        <div className="flex items-center gap-3">
          <Label htmlFor="name" className="text-sm font-semibold">
            Project Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Portly"
            className="w-1/2 mt-2"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-3">
          <Label htmlFor="tagline" className="text-sm font-semibold">
            Tagline <span className="text-red-500">*</span>
          </Label>
          <Input
            id="tagline"
            placeholder="A platform for founders and creators."
            className="w-1/2 mt-2"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-3">
          <Label htmlFor="projectUrl" className="text-sm font-semibold">
            Project Url
          </Label>
          <Input
            id="projectUrl"
            placeholder="portly.com/"
            className="w-1/2 mt-2"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-3">
          <Label htmlFor="videoUrl" className="text-sm font-semibold">
            Video Url
          </Label>
          <Input
            id="videoUrl"
            placeholder="youtube.com/video-link"
            className="w-1/2 mt-2"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-start gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Label className="text-sm font-semibold">Logo</Label>
              <Button
                variant="outline"
                className="rounded-lg"
                onClick={openFile}
              >
                <Upload /> Upload
              </Button>
            </div>
            <Input
              type="file"
              className="hidden"
              ref={fileRef}
              onChange={onFileChange}
              accept="image/*"
            />
          </div>

          {preview && (
            <div className="relative w-24 h-24">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-md border"
              />
              <button
                onClick={clearPreview}
                type="button"
                className="absolute -top-2 -right-2 bg-black rounded-full p-1 shadow-sm border"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Label htmlFor="tools" className="text-sm font-semibold">
            Tools & Tech Stack
          </Label>
          <div className="flex gap-3 items-center flex-wrap">
            <Input
              id="tools"
              className="w-[300px]"
              value={toolInput}
              onChange={(e) => setToolInput(e.target.value)}
            />
            <Button type="button" onClick={handleAddTool}>
              Add
            </Button>
          </div>
        </div>

        {formData.tools.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.tools.map((tool, index) => (
              <Badge key={index} className="flex gap-2 cursor-pointer">
                {tool}
                <X size={12} onClick={() => handleRemoveTool(tool)} />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Button onClick={handleSubmit} disabled={isAdding}>
        {isAdding ? (
          <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
        ) : (
          "Save"
        )}
      </Button>
    </div>
  );
}

export default AddNew;
