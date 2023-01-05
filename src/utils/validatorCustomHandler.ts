import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';

export const isImageValid = (extensionsValids: string[] = [], req: Request) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    throw new Error('La imagen es obligatoria');
  }
  const file: UploadedFile = <UploadedFile>req.files?.file;
  const ext: string = file.name.split('.').pop() || '';
  if (!extensionsValids.includes(ext)) {
    throw new Error(`La imagen debe ser de formato - ${extensionsValids}`);
  }
  //validando el tamaño del archivo
  if (file.size > 1000000) {
    throw new Error('La imagen debe ser menor a 1MB');
  }
  return true;
};
