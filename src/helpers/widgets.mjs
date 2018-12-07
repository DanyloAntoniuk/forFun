import mkdirp from 'mkdirp';

// Creates default directory for all uploading files
export function createFileDirectory(res, req, next) {
  mkdirp('./files');

  next();
}

// Creates directory for all uploading images
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
