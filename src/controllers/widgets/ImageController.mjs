/**
 * Module dependencies.
 */
import paginate from 'express-paginate';
import multer from 'multer';
import fs from 'fs';
import Image from '../../models/widgets/Image';
import { fileFilter } from '../../helpers/widgets';

export default {
  /**
   * Allowed mimetypes for Image entity.
   */
  allowedMimeTypes: ['image/png', 'image/jpg', 'image/jpeg'],

  /**
   * Initialize multer Middleware for uplaoding single file.
   *
   * @param {String} name Image field name from multipart/form-data type.
   */
  uploadSingle(name) {
    const storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, req.value.folder);
      },
      filename(req, file, cb) {
        cb(null, file.originalname);
      },
    });

    return multer({ storage, fileFilter: fileFilter(this.allowedMimeTypes) }).single(name);
  },

  /**
   * Initialize multer Middleware for uplaoding multiple files.
   *
   * @param {String} name Image field names from multipart/form-data type.
   */
  uploadMultiple(name) {
    const storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, req.value.folder);
      },
      filename(req, file, cb) {
        cb(null, file.originalname);
      },
    });

    return multer({ storage, fileFilter: fileFilter(this.allowedMimeTypes) }).array(name);
  },

  /**
   * Create image.
   */
  async imageCreate(req, res, next) {
    try {
      const {
        originalname,
        mimetype,
        path,
        size,
      } = req.file;
      const { title, imageTitle, imageAlt } = req.body;
      console.log(originalname, mimetype, path, size);

      const image = new Image({
        title,
        image: {
          title: imageTitle,
          alt: imageAlt,
          originalName: originalname,
          size,
          mimetype,
          path,
        },
      });

      try {
        await image.save();
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }

      res.status(201).json(image);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Create multiple images.
   * TODO
   */
  async imageCreateMultiple(req, res, next) {
    // try {
    //   console.log(req.files);
    //   const images = await Image.insertMany(req.files);

    //   await images.save();

    //   res.status(201).json(images);
    // } catch (err) {
    //   next(err);
    // }
  },

  /**
   * Get single image.
   */
  async imageGetOne(req, res, next) {
    try {
      const image = await Image.findById(req.params.id);

      if (!image) {
        return res.status(404).json({ message: `Image with id ${req.params.id} not found.` });
      }

      return res.json(image);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Update image.
   */
  async imageUpdate(req, res, next) {
    try {
      const {
        originalname,
        mimetype,
        path,
        size,
      } = req.file;
      const { title, imageTitle, imageAlt } = req.body;

      // Update or Replace Image entity?
      // Delete unused image?
      const updatedImage = await Image.findByIdAndUpdate(req.params.id, {
        title,
        image: {
          title: imageTitle,
          alt: imageAlt,
          originalName: originalname,
          size,
          mimetype,
          path,
        },
      }, { new: true });

      if (!updatedImage) {
        return res.status(404).json({ message: `Image with id ${req.params.id} not found.` });
      }

      res.json(updatedImage);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Delete image.
   */
  async imageDelete(req, res, next) {
    try {
      const deletedImage = await Image.findByIdAndDelete(req.params.id);

      if (!deletedImage) {
        return res.status(404).json({ message: `Image with id ${req.params.id} not found.` });
      }
      // Delete image from files directory.
      fs.unlink(deletedImage.image.path, (err) => {
        if (err) {
          next(err);
        }
      });

      res.json(deletedImage);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Get all images.
   *
   * By default 10 images are return, use query params for pagination.
   * @example '/api/widgets/images?page=2&limit=5'
   */
  async imageList(req, res, next) {
    try {
      // Limit must be int for paginate.
      const limit = Number(req.query.limit);

      const [images, count] = await Promise.all([
        Image.find({})
          .limit(limit)
          .skip(req.skip)
          .lean()
          .exec(),
        Image.countDocuments({}),
      ]);

      if (!count) {
        return res.status(404).json({ message: 'No Images found.' });
      }

      const pageCount = Math.ceil(count / limit);

      res.json({
        images,
        hasMore: paginate.hasNextPages(req)(pageCount),
      });
    } catch (err) {
      next(err);
    }
  },
};
