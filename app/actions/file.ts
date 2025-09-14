"use server";

import { v2 as cloud, UploadApiResponse } from "cloudinary";

// تنظیمات Cloudinary از متغیرهای محیطی
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
 * Upload file to Cloudinary
 * @param data FormData containing file with key "file"
 */
export const uploadFile = async (
  data: FormData
): Promise<UploadApiResponse | undefined> => {
  const file = data.get("file");

  if (!file) throw new Error("No file provided in FormData.");

  // بررسی نوع فایل: در Node.js، معمولاً Blob یا Buffer داریم
  let buffer: Buffer;
  let filename: string;

  if (file instanceof Blob) {
    buffer = Buffer.from(await file.arrayBuffer());
    filename = (file as any).name || "upload";
  } else if (Buffer.isBuffer(file)) {
    buffer = file;
    filename = "upload";
  } else {
    throw new Error("Uploaded file is invalid. Must be Blob or Buffer.");
  }

  return new Promise((resolve, reject) => {
    const stream = cloud.uploader.upload_stream(
      { folder: "rich-editor", public_id: filename },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as UploadApiResponse);
      }
    );

    stream.end(buffer);
  });
};

/**
 * Read all images from Cloudinary folder
 */
export const readAllImages = async (): Promise<string[]> => {
  try {
    const { resources } = await cloud.api.resources({
      prefix: "rich-editor",
      resource_type: "image",
      type: "upload",
    });

    return resources.map((r: { secure_url: any }) => r.secure_url);
  } catch (error) {
    console.error("Error reading images:", error);
    return [];
  }
};

/**
 * Remove image by public_id
 */
export const removeImage = async (id: string) => {
  try {
    await cloud.uploader.destroy(id);
  } catch (error) {
    console.error("Error removing image:", error);
  }
};
