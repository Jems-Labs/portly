"use client";

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
import { CircleUser } from "lucide-react";
import React, { useState } from "react";
import { useApp } from "@/stores/useApp";
import { personalPronounsList, status as statusList } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function Admin() {
  const { user, updateProfile } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPronouns, setSelectedPronouns] = useState(
    user?.pronouns || "prefer_not_to_say"
  );
  const [selectedStatus, setSelectedStatus] = useState(user?.status || "open");

  const [previewImage, setPreviewImage] = useState<string>(
    user?.image?.url || "user_ph.png"
  );
  const [file, setFile] = useState<File | null>(null);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [bio, setBio] = useState(user?.bio || "");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
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

  return (
    <div className="px-5">
      <div className="flex items-center gap-2 py-3">
        <CircleUser size={17} />
        <h1>Basic Profile</h1>
      </div>
      <Separator />

      <div className="py-5 flex items-center gap-2">
        <div className="w-[60px] h-[60px] rounded-full overflow-hidden border">
          <img
            src={previewImage}
            alt="Profile Preview"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="upload"
            className="cursor-pointer text-sm text-green-700 border-b"
          >
            Upload new
          </Label>
          <Input
            id="upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
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
            className="bg-black"
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
            className="bg-black"
          />
        </div>
      </div>

      <div>
        <Label>Bio</Label>
        <Textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="bg-black"
        />
      </div>

      <div className="flex w-full gap-3 items-center py-3">
        <div>
          <Label>Personal Pronouns</Label>
          <Select value={selectedPronouns} onValueChange={setSelectedPronouns}>
            <SelectTrigger className="w-[180px] bg-black">
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
            <SelectTrigger className="w-[180px] bg-black">
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
  );
}

export default Admin;
