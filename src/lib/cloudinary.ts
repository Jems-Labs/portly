import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  file: File,
  folderName: string
): Promise<string | null | undefined> {
  return new Promise((resolve, reject) => {
    try {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: folderName },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result?.secure_url);
          }
        }
      );

      const arrayBuffer = file.arrayBuffer();
      arrayBuffer.then((buffer) =>
        streamifier.createReadStream(Buffer.from(buffer)).pipe(uploadStream)
      );
    } catch (err) {
      reject(err);
    }
  });
}
export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch {
    return false;
  }
}
export function getPublicIdFromUrl(imageUrl: string): string | null {
  if (!imageUrl) return null;

  const parts = imageUrl.split("/");
  const uploadIndex = parts.indexOf("upload");

  if (uploadIndex === -1) return null;

  const publicIdWithExtension = parts.slice(uploadIndex + 2).join("/");
  return publicIdWithExtension.split(".")[0]; // Remove file extension
}
