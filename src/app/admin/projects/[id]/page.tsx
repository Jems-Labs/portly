'use client';

import { useApp } from '@/stores/useApp';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function Project() {
  const { id } = useParams();
  const { getProject, updateProject } = useApp();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: ProjectData } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => await getProject(id as string),
    staleTime: 1000 * 60 * 3,
  });

  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    projectUrl: '',
    videoUrl: '',
    tools: '',
    logo: null as File | string | null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (ProjectData) {
      setFormData({
        name: ProjectData.name,
        tagline: ProjectData.tagline,
        projectUrl: ProjectData.projectUrl,
        videoUrl: ProjectData.videoUrl,
        tools: ProjectData.tools?.join(', ') || '',
        logo: ProjectData.logo || null,
      });

      if (typeof ProjectData.logo === 'string') {
        setPreviewImage(ProjectData.logo);
      }
    }
  }, [ProjectData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFormData((prev) => ({ ...prev, logo: selectedFile }));
      const previewURL = URL.createObjectURL(selectedFile);
      setPreviewImage(previewURL);
    } else {
      setFormData((prev) => ({ ...prev, logo: null }));
      setPreviewImage(null);
    }
  };

  const handleSubmit = async () => {
    const logoToSend =
      formData.logo instanceof File
        ? formData.logo
        : null;
    const payload = {
      name: formData.name,
      tagline: formData.tagline,
      projectUrl: formData.projectUrl,
      videoUrl: formData.videoUrl,
      tools: formData.tools
        .split(',')
        .map((tool) => tool.trim())
        .filter((tool) => tool.length > 0),
      logo: logoToSend,
    };

    const data = new FormData();
    data.append('name', payload.name);
    data.append('tagline', payload.tagline);
    data.append('projectUrl', payload.projectUrl);
    data.append("videoUrl", payload.videoUrl);
    data.append('tools', JSON.stringify(payload.tools));
    if (payload.logo instanceof File) {
      data.append('logo', payload.logo);
    }
    setIsLoading(true);
    await updateProject(data, ProjectData?.id);
    setIsLoading(false);
    if (ProjectData) {
      setFormData({
        name: ProjectData.name,
        tagline: ProjectData.tagline,
        projectUrl: ProjectData.projectUrl,
        videoUrl: ProjectData.videoUrl,
        tools: ProjectData.tools?.join(', ') || '',
        logo: ProjectData.logo || null,
      });

      if (typeof ProjectData.logo === 'string') {
        setPreviewImage(ProjectData.logo);
      } else {
        setPreviewImage(null);
      }
    }
  };

  return (
    <div className="px-5">
      <div className="flex items-center gap-4 py-3">
        <Button variant="outline" className="rounded-lg" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-lg font-bold">Edit Project</h1>
      </div>

      <Separator />

      <div className="flex flex-col gap-4 py-5">
        {previewImage && (
          <div className="mt-2">
            <Label className="text-sm font-semibold mb-1 block">Logo Preview</Label>
            <div className="flex gap-3 items-center">
              <img src={previewImage} alt="Logo Preview" className="w-32 h-32 object-contain rounded border" />
              <Label htmlFor="upload" className="cursor-pointer text-sm text-green-700 border-b">
                Upload new
              </Label>
              <Input
                id="upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
        )}

        {!previewImage && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="upload" className="text-sm font-semibold">
              Upload Logo
            </Label>
            <Input
              id="upload"
              type="file"
              accept="image/*"
              className="w-1/2 bg-[#0D0D0D]"
              onChange={handleImageChange}
            />
          </div>
        )}

        {['name', 'tagline', 'projectUrl', 'videoUrl', 'tools'].map((id) => (
          <div className="flex flex-col gap-2" key={id}>
            <Label htmlFor={id} className="text-sm font-semibold capitalize">
              {id.replace(/([A-Z])/g, ' $1')}
              {(id === 'name' || id === 'tagline') && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={id}
              value={formData[id as keyof typeof formData] as string}
              onChange={handleChange}
              className="w-1/2 bg-[#0D0D0D]"
            />
            {id === 'tools' && (
              <span className="text-xs text-muted-foreground">
                Comma separated (e.g. React.js, Hono.js, PostgreSQL)
              </span>
            )}
          </div>
        ))}

        <Button className="w-fit mt-4" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  );
}

export default Project;
