/**
 * Module dependencies.
 */
import paginate from 'express-paginate';
import Post from '../models/Post';

export default {
  /**
   * Get all posts.
   *
   * By default 10 posts are return, use query params for pagination.
   * @example '/api/acticles?page=2&limit=5'
   */
  async postList(req, res, next) {
    try {
      // Limit must be int for paginate.
      const limit = Number(req.query.limit);

      const [posts, count] = await Promise.all([
        Post.find({})
          .populate('author')
          .populate('widgets.id')
          .limit(limit)
          .skip(req.skip)
          .lean()
          .exec(),
        Post.countDocuments({}),
      ]);

      if (!count) {
        return res.status(404).json({ message: 'No Posts found.' });
      }

      const pageCount = Math.ceil(count / limit);

      res.json({
        posts,
        hasMore: paginate.hasNextPages(req)(pageCount),
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Get one post from id.
   */
  async postGetOne(req, res, next) {
    try {
      const post = await Post.findById(req.params.id)
        .populate('author')
        .populate('widgets.id');

      res.json(post);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Create post.
   * @TODO Use dynamic mongoose fields.
   */
  async postCreate(req, res, next) {
    try {
      const post = new Post(req.value.body);

      await post.save();

      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Update post.
   */
  async postUpdate(req, res, next) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.value.body,
        { new: true },
      );

      res.json(updatedPost);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Delete post.
   */
  async postDelete(req, res, next) {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);

      res.json(deletedPost);
    } catch (err) {
      next(err);
    }
  },
};
