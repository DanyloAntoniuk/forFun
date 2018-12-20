/**
 * Module dependencies.
 */
import paginate from 'express-paginate';
import Video from '../../models/widgets/Video';

export default {
  /**
   * Create video.
   */
  async videoCreate(req, res, next) {
    try {
      const video = new Video(req.value.body);

      await video.save();

      res.status(201).json(video);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Get single video.
   */
  async videoGetOne(req, res, next) {
    try {
      const video = await Video.findById(req.params.id);

      if (!video) {
        return res.status(404).json({ message: `Video with id ${req.params.id} not found.` });
      }

      res.json(video);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Update video.
   */
  async videoUpdate(req, res, next) {
    try {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        req.value.body,
        { new: true },
      );

      if (!updatedVideo) {
        return res.status(404).json({ message: `Video with id ${req.params.id} not found.` });
      }

      res.json(updatedVideo);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Delete video.
   */
  async videoDelete(req, res, next) {
    try {
      const deletedVideo = await Video.findByIdAndDelete(req.params.id);

      if (!deletedVideo) {
        return res.status(404).json({ message: `Video with id ${req.params.id} not found.` });
      }

      res.json(deletedVideo);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Get all videos.
   *
   * By default 10 videos are return, use query params for pagination.
   * @example '/api/widgets/videos?page=2&limit=5'
   */
  async videoList(req, res, next) {
    try {
      // Limit must be int for paginate.
      const limit = Number(req.query.limit);

      const [images, count] = await Promise.all([
        Video.find({})
          .limit(limit)
          .skip(req.skip)
          .lean()
          .exec(),
        Video.countDocuments({}),
      ]);

      if (!count) {
        return res.status(404).json({ message: 'No Videos found.' });
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
