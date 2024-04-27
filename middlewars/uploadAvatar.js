import { ImageServise } from "../services/imageService.js";

export const uploadAvatar = ImageServise.initUploadImageMiddleware("avatar");
