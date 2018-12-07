import paginate from 'express-paginate';
import multer from 'multer';
import mkdirp from 'mkdirp';
import Image from '../../models/widgets/Image';

export default {
  uploadSingle(name) {
    const storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, req.value.folder);
      },
      filename(req, file, cb) {
        cb(null, file.originalname);
      },
    });

    return multer({ storage }).single(name);
  },

  async imageCreate(req, res, next) {
    try {
      console.log(req.file);
      // const image = new Image(req.body);

      // await image.save();

      res.status(201).json(req.file);
    } catch (err) {
      next(err);
    }
  },
};
