import React, { useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/lib/actions";

interface PersonalInfoInputProps {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    title: string;
    objective: string;
    image?: string;
  };
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onImageUpload: (file: File) => void;
}

const PersonalInfoInput: React.FC<PersonalInfoInputProps> = ({
  personalInfo,
  onInputChange,
  onImageUpload,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const imagePath = await uploadImage(formData);
      onInputChange({
        target: { name: "image", value: imagePath },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Personal Information</h2>

      <div className="flex divide-x">
        <div className="flex-1 w-full space-y-4 pr-4">
          {/* Existing input fields */}
          <input
            type="text"
            name="fullName"
            value={personalInfo.fullName || ""}
            onChange={onInputChange}
            placeholder="Full Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={personalInfo.email || ""}
            onChange={onInputChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            type="tel"
            name="phone"
            value={personalInfo.phone || ""}
            onChange={onInputChange}
            placeholder="Phone"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="title"
            value={personalInfo.title || ""}
            onChange={onInputChange}
            placeholder="Current Occupation Title"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="objective"
            value={personalInfo.objective || ""}
            onChange={onInputChange}
            placeholder="Career Objective"
            className="w-full p-2 border rounded h-24"
          />
        </div>
        {/* right col */}
        <div className="w-[40%] px-4">
          <div className="">
            {(previewImage || personalInfo.image) && (
              <Image
                src={
                  previewImage || personalInfo.image || "/placeholder-image.jpg"
                }
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full mx-auto"
              />
            )}

            <div className="mt-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="profile-image-upload"
              />
              <label
                htmlFor="profile-image-upload"
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Upload Profile Image
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoInput;
