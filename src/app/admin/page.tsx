"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CircleUser, Link, Tag,
  X
} from "lucide-react";
import React, { useState } from "react";
import { useApp } from "@/stores/useApp";
import { personalPronounsList, platforms, status as statusList } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function Admin() {
  const { user, updateProfile, addTag, deleteTag, addSocialLink } = useApp();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedPronouns, setSelectedPronouns] = useState(user?.pronouns || "prefer_not_to_say");
  const [selectedStatus, setSelectedStatus] = useState(user?.status || "open");
  const [previewImage, setPreviewImage] = useState<string>(user?.image?.url || "user_ph.png");
  const [file, setFile] = useState<File | null>(null);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [tag, setTag] = useState<string>("");

  const [isAddingTag, setIsAddingTag] = useState(false);
  const [isAddingSocialLink, setIsAddingSocialLink] = useState(false);
  const [socialLinks, setSocialLinks] = useState(
    user?.socialLinks?.map((link) => ({ key: link.platform, url: link.url })) || []
  );

  const handleSocialLinkChange = (key: string, value: string) => {
    setSocialLinks((prevLinks) => {
      const exists = prevLinks.find((link) => link.key === key);
      if (exists) {
        return prevLinks.map((link) =>
          link.key === key ? { ...link, url: value } : link
        );
      } else {
        return [...prevLinks, { key, url: value }];
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const previewURL = URL.createObjectURL(selectedFile);
      setPreviewImage(previewURL);

      return () => URL.revokeObjectURL(previewURL);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("bio", bio);
    formData.append("pronouns", selectedPronouns);
    formData.append("status", selectedStatus);
    if (file) formData.append("image", file);

    await updateProfile(formData);
    setIsLoading(false);
  };

  const handleAddTag = async () => {
    setIsAddingTag(true);
    if (tag) {
      await addTag(tag);
      setTag("");
    }
    setIsAddingTag(false);
  };
  const handleAddSocialLink = async () => {
    setIsAddingSocialLink(true);
    await addSocialLink(socialLinks);
    setIsAddingSocialLink(false);
  }
  return (
    <div className="px-5">
      <div>
        <div className="flex items-center gap-2 py-3">
          <CircleUser size={17} />
          <h1>Basic Profile</h1>
        </div>
        <Separator />

        <div className="py-5 flex items-center gap-2">
          <div className="w-[60px] h-[60px] rounded-full overflow-hidden border">
            <img src={previewImage} alt="Profile Preview" className="object-cover w-full h-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="upload" className="cursor-pointer text-sm text-green-700 border-b">
              Upload new
            </Label>
            <Input id="upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </div>
        </div>

        <div className="flex items-center gap-3 py-3">
          <div className="flex flex-col gap-2 py-3 w-1/2">
            <Label>
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="eg. John"
              className="bg-[#0D0D0D]"
            />
          </div>
          <div className="flex flex-col gap-2 py-3 w-1/2">
            <Label>
              Last Name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="eg. Doe"
              className="bg-[#0D0D0D]"
            />
          </div>
        </div>

        <div>
          <Label>Bio</Label>
          <Textarea value={bio} onChange={(e) => setBio(e.target.value)} className="bg-[#0D0D0D]" />
        </div>

        <div className="flex w-full gap-3 items-center py-3">
          <div>
            <Label>Personal Pronouns</Label>
            <Select value={selectedPronouns} onValueChange={setSelectedPronouns}>
              <SelectTrigger className="w-[180px] bg-[#0D0D0D]">
                <SelectValue placeholder="Select pronouns" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {personalPronounsList.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Status</Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px] bg-[#0D0D0D]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {statusList.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
          ) : (
            "Save"
          )}
        </Button>
      </div>

      {/* Tags */}
      <div className="py-10">
        <div className="flex items-center gap-2 py-3">
          <Tag size={17} />
          <h1>Profile Tags</h1>
        </div>
        <Separator />

        <div className="flex gap-2 py-3">
          <Input
            placeholder="Add skills, tools or roles"
            className="bg-[#0D0D0D]"
            onChange={(e) => setTag(e.target.value)}
            value={tag}
          />
          <Button onClick={handleAddTag} disabled={isAddingTag}>
            {isAddingTag ? (
              <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
            ) : (
              "Add"
            )}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {user?.skills?.map((skill, index) => (
            <Badge key={index} className="flex gap-2 cursor-pointer">
              {skill?.name}
              <X size={12} onClick={() => deleteTag(skill.id)} />
            </Badge>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div>
        <div className="flex items-center gap-2 py-3">
          <Link size={17} />
          <h1>Social Links</h1>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {platforms.map((platform) => (
            <div key={platform.key} className="flex items-center gap-3 bg-[#0D0D0D] p-3 rounded-lg">
              <img src={platform.svg} alt={platform.name} className="w-5 h-5" />
              <Input
                placeholder={`${platform.name} URL`}
                value={socialLinks.find((link) => link.key === platform.key)?.url || ""}
                onChange={(e) => handleSocialLinkChange(platform.key, e.target.value)}
                className="flex-1 bg-transparent border focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          ))}
        </div>
        <Button onClick={handleAddSocialLink} disabled={isAddingSocialLink}>
          {
            isAddingSocialLink ? (
              <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
            ) : (
              "Save"
            )
          }
        </Button>
      </div>
    </div>
  );
}

export default Admin;
