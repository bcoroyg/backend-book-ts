import { UploadedFile } from 'express-fileupload';
import { existsSync, mkdirSync } from 'fs';
import createHttpError from 'http-errors';
import { join } from 'path';

export const uploadHandler = (file: UploadedFile) => {
  return new Promise((resolve, reject) => {
    //##### CAPTURAR LA EXTENSIÓN DEL ARCHIVO #####
    const ext = file.name.split('.').pop();

    // Crear la nueva carpeta con el nombre de la colección si aún no existe
    if (!existsSync(`./src/assets/images/books`)) {
      mkdirSync(`./src/assets/images/books`);
    }

    //nombre del archivo
    const nameFileTemp = `${Date.now()}.${ext}`;
    //url del archivo
    const pathUrl = join(__dirname, '../assets/images/books', nameFileTemp);

    // Moviendo archivo a la carpeta img
    file.mv(pathUrl, (err: Error) => {
      if (err) {
        return reject(createHttpError(400, 'La imagen no fue almacenada'));
      }
      resolve(nameFileTemp);
    });
  });
};
