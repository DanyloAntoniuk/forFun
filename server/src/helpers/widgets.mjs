/**
 * Module dependencies.
 */
import mkdirp from 'mkdirp';
import multer from 'multer';

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
 * Middleware for creating directory for all uploading images.
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
 * @returns {Function} Express middleware.
 */
function fileFilter(mimeTypes) {
  return (req, file, cb) => {
    if (!mimeTypes.includes(file.mimetype)) {
      return cb(new multer.MulterError(`Only ${mimeTypes.toString()} mimetypes are available.`), false);
    }

    cb(null, true);
  };
}

/**
 * Initialize multer Middleware for uplaoding single file.
 *
 * @param {String} name File field name from multipart/form-data type.
 * @returns {Function} Multer Middleware.
 */
export function uploadSingle(name) {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, req.value.folder);
    },
    filename(req, file, cb) {
      cb(null, file.originalname);
    },
  });

  return multer({ storage, fileFilter: fileFilter(this.allowedMimeTypes) }).single(name);
}

/**
 * Initialize multer Middleware for uplaoding multiple files.
 *
 * @param {String} name File field names from multipart/form-data type.
 * @returns {Function} Multer Middleware.
 */
export function uploadMultiple(name) {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, req.value.folder);
    },
    filename(req, file, cb) {
      cb(null, file.originalname);
    },
  });

  return multer({ storage, fileFilter: fileFilter(this.allowedMimeTypes) }).array(name);
}
