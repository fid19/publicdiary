"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import image from "next/image";

const ImageChooser = ({ profilePicUrl, handleProfilePic }) => {
  const existingImage = Boolean(profilePicUrl);

  const [previewImage, setPreviewImage] = useState<string | null>(
    existingImage
      ? `https://publicdiaryapp.s3.us-east-1.amazonaws.com/images/${profilePicUrl}`
      : null
  );

  return (
    <div className="flex gap-3">
      <div className="w-32">
        <div className="relative size-32">
          <FormLabel
            className={`group absolute size-32 rounded-lg ${
              !previewImage &&
              "bg-accent opacity-40 focus-within:opacity-100 hover:opacity-100"
            } ${!existingImage && "cursor-pointer focus-within:ring-4"}`}
          >
            {previewImage ? (
              <div className="relative size-32 rounded-full">
                <Image
                  src={previewImage}
                  alt={"profile pic"}
                  className="size-32 rounded-lg object-cover"
                  layout="fill"
                  fill
                />
                {existingImage ? null : (
                  <div className="pointer-events-none absolute -right-0.5 -top-0.5 rotate-12 rounded-sm bg-secondary px-2 py-1 text-xs text-secondary-foreground shadow-md ">
                    new
                  </div>
                )}
              </div>
            ) : (
              <div className="flex size-32 items-center justify-center rounded-lg border border-muted-foreground text-4xl text-muted-foreground">
                ➕
              </div>
            )}
            {existingImage ? (
              <input name="imageId" type="hidden" value={profilePicUrl} />
            ) : null}

            <Input
              className="absolute left-0 top-0 z-0 size-32 cursor-pointer opacity-0"
              name="profilePic.file"
              accept="image/*"
              type="file"
              onChange={(event) => {
                const file = event.target?.files?.[0];

                if (file) {
                  const reader = new FileReader();

                  reader.onloadend = () => {
                    setPreviewImage(reader.result as string);
                  };

                  handleProfilePic(file, "profile-pic");
                  reader.readAsDataURL(file);

                  console.log(file.type);
                } else {
                  setPreviewImage(null);
                }
              }}
            />
          </FormLabel>
        </div>
      </div>
    </div>
  );
};

export default ImageChooser;
