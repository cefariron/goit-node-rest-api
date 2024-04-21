import multer from "multer";
import jimp from "jimp";
import path from "path";
import { nanoid } from "nanoid";
import * as fse from "fs-extra";
import HttpError from "../helpers/HttpError.js";

export class ImageServise {
  static initUploadImageMiddleware(fieldName) {
    const multerStorage = multer.memoryStorage();

    const multerFilter = (req, file, cbk) => {
      if (file.mimetype.startsWith("image/")) {
        cbk(null, true);
      } else {
        cbk(HttpError(400, "Please upload images only!"), false);
      }
    };

    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
    }).single(fieldName);
  }

  static async saveImage(file, options, ...pathSegments) {
    if (
      file.size >
      (options?.maxFileSize
        ? options.maxFileSize * 1024 * 1024
        : 2 * 1024 * 1024)
    ) {
      throw HttpError(400, "File is too large, please use a file up to 2 MB!");
    }

    const fileName = `${nanoid(8)}.jpeg`;
    const fullFilePath = path.join(process.cwd(), "public", ...pathSegments);

    await fse.ensureDir(fullFilePath);

    const avatar = await jimp.read(file.buffer);
    await avatar.cover(options?.width ?? 300, options?.height ?? 300).writeAsync(path.join(fullFilePath, fileName));

    return path.join(...pathSegments, fileName);
  }
}
