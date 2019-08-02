/**
 * Module dependencies.
 */
import paginate from 'express-paginate';
import fs from 'fs';
import Image from '../../models/widgets/Image';
import Post from '../../models/Post';

export default {
  /**
   * Allowed mimetypes for Image entity.
   */
  allowedMimeTypes: ['image/png', 'image/jpg', 'image/jpeg'],

  /**
   * Create image.
   *
   * @TODO Don't save duplicate images in different folders.
   * Save path to existing image.
   */
  async imageCreate(req, res, next) {
    try {
      const {
        originalname,
        mimetype,
        path,
        size,
      } = req.file;
      const { title } = req.body;

      try {
        // Prevent creation of duplicates
        const foundImage = await Image.find({ title });

        if (foundImage.length) {
          return res.status(201).json(foundImage[0]);
        }
      } catch (err) {
        next(err);
      }

      const image = new Image({
        title,
        image: {
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
   * @@TODO
   */
  // async imageCreateMultiple(req, res, next) {
  // try {
  //   console.log(req.files);
  //   const images = await Image.insertMany(req.files);

  //   await images.save();

  //   res.status(201).json(images);
  // } catch (err) {
  //   next(err);
  // }
  // },

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

      // Update or Replace Image entity?
      // Delete unused image?
      const updatedImage = await Image.findByIdAndUpdate(req.params.id, {
        ...req.body,
        image: {
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
