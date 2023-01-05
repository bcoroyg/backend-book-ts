import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';
import config from '../config';

cloudinary.config({
  cloud_name: config.cloudName,
  api_key: config.cloudApiKey,
  api_secret: config.cloudApiSecret
});

export const uploadImageCloudinary = async (file: UploadedFile) => {
  try {
    const { tempFilePath } = file;
    const response = await cloudinary.uploader.upload(tempFilePath);
    return response.secure_url;
  } catch (error) {
    return error;
  };
};

export const deleteImageCloudinary = async (image: string) => {
  try {
    const arrName = image.split('/');
    const nameImg = arrName[arrName.length - 1];
    const [public_id] = nameImg.split('.');
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    return error;
  };
};
