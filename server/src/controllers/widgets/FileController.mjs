/**
 * Module dependencies.
 */
import paginate from 'express-paginate';
import fs from 'fs';
import File from '../../models/widgets/File';

export default {
  /**
   * Allowed mimetypes for File entity.
   */
  allowedMimeTypes: [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'application/pdf',
  ],

  /**
   * Create file.
   *
   * @TODO Don't save duplicate files in different folders.
   * Save path to existing image.
   */
  async fileCreate(req, res, next) {
    try {
      const {
        originalname,
        mimetype,
        path,
        size,
      } = req.file;
      const { title } = req.body;

      const file = new File({
        title,
        file: {
          originalName: originalname,
          size,
          mimetype,
          path,
        },
      });

      try {
        await file.save();
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }

      res.status(201).json(file);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Create multiple files.
   * @@TODO
   */
  // async imageCreateMultiple(req, res, next) {
  // try {
  //   console.log(req.files);
  //   const files = await File.insertMany(req.files);

  //   await files.save();

  //   res.status(201).json(files);
  // } catch (err) {
  //   next(err);
  // }
  // },

  /**
   * Get single file.
   */
  async fileGetOne(req, res, next) {
    try {
      const file = await File.findById(req.params.id);

      if (!file) {
        return res.status(404).json({ message: `File with id ${req.params.id} not found.` });
      }

      return res.json(file);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Update file.
   */
  async fileUpdate(req, res, next) {
    try {
      const {
        originalname,
        mimetype,
        path,
        size,
      } = req.file;
      const { title } = req.body;

      // Update or Replace File entity?
      // Delete unused file?
      const updatedFile = await File.findByIdAndUpdate(req.params.id, {
        title,
        file: {
          originalName: originalname,
          size,
          mimetype,
          path,
        },
      }, { new: true });

      if (!updatedFile) {
        return res.status(404).json({ message: `File with id ${req.params.id} not found.` });
      }

      res.json(updatedFile);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Delete file.
   */
  async fileDelete(req, res, next) {
    try {
      const deletedFile = await File.findByIdAndDelete(req.params.id);

      if (!deletedFile) {
        return res.status(404).json({ message: `File with id ${req.params.id} not found.` });
      }
      // Delete file from files directory.
      fs.unlink(deletedFile.file.path, (err) => {
        if (err) {
          next(err);
        }
      });

      res.json(deletedFile);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Get all files.
   *
   * By default 10 files are return, use query params for pagination.
   * @example '/api/widgets/files?page=2&limit=5'
   */
  async fileList(req, res, next) {
    try {
      // Limit must be int for paginate.
      const limit = Number(req.query.limit);

      const [files, count] = await Promise.all([
        File.find({})
          .limit(limit)
          .skip(req.skip)
          .lean()
          .exec(),
        File.countDocuments({}),
      ]);

      if (!count) {
        return res.status(404).json({ message: 'No Files found.' });
      }

      const pageCount = Math.ceil(count / limit);

      res.json({
        files,
        hasMore: paginate.hasNextPages(req)(pageCount),
      });
    } catch (err) {
      next(err);
    }
  },
};
