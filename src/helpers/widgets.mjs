/**
 * Module dependencies.
 */
import mkdirp from 'mkdirp';

/**
 * Middleware for creating default directory for all uploading files.
 * This is used to ensure upload directory is created
 * before working with first request.
 */
export function ensureDirectoryCreated(res, req, next) {
  mkdirp('./files');

  next();
}

/**
 * Middleware got creating directory for all uploading images.
 */
export function createUploadDirectory(req, res, next) {
  const currentDate = new Date().toLocaleDateString();

  // Group images in directory by uploaded day
  const folder = `./files/${currentDate.split('/').join('-')}`;
  mkdirp(folder);

  // Pass path to directory to next middleware
  req.value = req.value || {};
  req.value.folder = folder;

  next();
}

/**
 * File filter callback for multer module.
 *
 * @param {Array} mimeTypes Allowed mimetypes.
 * @returns {Function}
 */
export function fileFilter(mimeTypes) {
  return (req, file, cb) => {
    if (!mimeTypes.includes(file.mimetype)) {
      cb(new Error(`Only ${mimeTypes.toString()} mimetypes are available.`), false);
    }

    cb(null, true);
  };
}
