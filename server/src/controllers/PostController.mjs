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
      let posts;
      let count;

      if (req.query.filterValue !== 'undefined') {
        [posts, count] = await Promise.all([
          Post.find({ title: { $regex: req.query.filterValue, $options: 'i' } })
            .populate('author')
            // .populate('widgets.id')
            .limit(limit)
            .skip(req.skip)
            .lean()
            .sort({ [req.query.sortField]: req.query.sortDirection })
            .exec(),
          Post.countDocuments({ title: { $regex: req.query.filterValue, $options: 'i' } }),
        ]);
      } else {
        [posts, count] = await Promise.all([
          Post.find({})
            .populate('author')
            // .populate('widgets.id')
            .limit(limit)
            .skip(req.skip)
            .lean()
            .sort({ [req.query.sortField]: req.query.sortDirection })
            .exec(),
          Post.countDocuments({}),
        ]);
      }

      if (!count) {
        return res.json({ message: 'No Posts found.' });
      }

      const pageCount = Math.ceil(count / limit);

      return res.json({
        data: posts,
        count,
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
      const { title } = req.params;

      const post = await Post.find({ title })
        .populate('author')
        .populate('widgets.image');

      if (!post) {
        return res.status(404).json({ message: `Post with id ${req.params.id} not found.` });
      }

      return res.json(post[0]);
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

      if (!updatedPost) {
        return res.status(404).json({ message: `Post with id ${req.params.id} not found.` });
      }

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

      if (!deletedPost) {
        return res.status(404).json({ message: `Post with id ${req.params.id} not found.` });
      }

      res.json(deletedPost);
    } catch (err) {
      next(err);
    }
  },

  async postDeleteMany(req, res, next) {
    try {
      const result = await Post.deleteMany({ _id: { $in: req.body } });

      return res.json({ message: `Succesfuly deleted ${result.n} records` });
    } catch (err) {
      next(err);
    }
  },
};
