import paginate from 'express-paginate';
import Post from '../models/Post';

export default {
  async postList(req, res, next) {
    try {
      // Limit must be int for paginate.
      const limit = Number(req.query.limit);

      const [posts, count] = await Promise.all([
        Post.find({})
          .limit(limit)
          .skip(req.skip)
          .lean()
          .exec(),
        Post.countDocuments({}),
      ]);

      const pageCount = Math.ceil(count / req.query.limit);

      res.json({
        posts,
        hasMore: paginate.hasNextPages(req)(pageCount),
      });
    } catch (err) {
      next(err);
    }
  },

  async postGetOne(req, res, next) {
    try {
      const post = await Post.findById(req.params.id);

      res.json(post);
    } catch (err) {
      next(err);
    }
  },

  async postCreate(req, res, next) {
    try {
      const post = new Post(req.body);

      await post.save();

      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  },

  async postUpdate(req, res, next) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body);

      res.json(updatedPost);
    } catch (err) {
      next(err);
    }
  },

  async postDelete(req, res, next) {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);

      res.json(deletedPost);
    } catch (err) {
      next(err);
    }
  },
};
