
"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { action } from "@/lib/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ProfileFormProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
    businessName?: string;
    role: string;
  };
};

const ProfileForm = ({ user }: ProfileFormProps) => {
  const [name, setName] = useState(user.name || "");
  const [businessName, setBusinessName] = useState(
    user.businessName || ""
  );
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      let imageUrl = user.image || "";

      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        formData.append(
          "key",
          process.env.NEXT_PUBLIC_IMGBB_API_KEY!
        );

        const uploadResponse = await fetch(
          "https://api.imgbb.com/1/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadData = await uploadResponse.json();

        if (!uploadData.success) {
          throw new Error("Profile image upload failed");
        }

        imageUrl = uploadData.data.url;
      }

      await action.put("/api/users/profile", {
        name,
        image: imageUrl,
        ...(user.role === "vendor" ? { businessName } : {}),
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl rounded-xl border bg-white p-6">
      <h2 className="text-xl font-bold text-[#245C45]">
        Profile Information
      </h2>

      <form onSubmit={handleUpdate} className="mt-6 space-y-5">
        <div>
          <Label>Email</Label>
          <Input
            value={user.email}
            disabled
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2"
            required
          />
        </div>

        {user.role === "vendor" && (
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="mt-2"
            />
          </div>
        )}

        <div>
          <Label>Profile Image</Label>

          {user.image && !image && (
            <div className="mt-3">
              <Image
                src={user.image}
                alt="Profile"
                width={100}
                height={100}
                className="h-24 w-24 rounded-full object-cover"
              />
            </div>
          )}

          <Input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
            className="mt-2"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="bg-[#245C45] hover:bg-[#173F31]"
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
