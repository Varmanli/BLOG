"use server";

import { v2 as cloud, UploadApiResponse } from "cloudinary";

const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;

if (!CLOUD_NAME || !CLOUD_API_KEY || !CLOUD_API_SECRET) {
  throw new Error(
    "Cloudinary config is missing! Please set CLOUD_NAME, CLOUD_API_KEY, and CLOUD_API_SECRET in your environment variables."
  );
}

cloud.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
  secure: true,
});

/**
 * آپلود فایل به Cloudinary
 * @param data FormData شامل فایل با کلید "file"
 */
export const uploadFile = async (
  data: FormData
): Promise<UploadApiResponse | undefined> => {
  const file = data.get("file") as File;

  if (!file) throw new Error("No file provided in FormData.");

  if (!(file instanceof File)) {
    throw new Error("Uploaded file is invalid or not a File.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    cloud.uploader
      .upload_stream({ folder: "rich-editor" }, (error, result) => {
        if (error) reject(error);
        else resolve(result as UploadApiResponse);
      })
      .end(buffer);
  });
};

export const readAllImages = async (): Promise<string[]> => {
  try {
    const { resources } = (await cloud.api.resources({
      prefix: "rich-editor",
      resource_type: "image",
      type: "upload",
    })) as { resources: UploadApiResponse[] };

    return resources.map(({ secure_url }) => secure_url);
  } catch (error) {
    console.error("Error reading images:", error);
    return [];
  }
};

export const removeImage = async (id: string) => {
  try {
    await cloud.uploader.destroy(id);
  } catch (error) {
    console.error("Error removing image:", error);
  }
};
