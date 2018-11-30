import paginate from 'express-paginate';
import Post from '../models/Post';

export default {
  async postList(req, res) {
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
      console.error(err);

      res.status(500).json({ err });
    }
  },

  async postGetOne(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      res.json(post);
    } catch (err) {
      console.error(err);

      res.status(404).json({ err });
    }
  },

  async postCreate(req, res) {
    const post = new Post(req.body);

    try {
      await post.save();

      res.status(201).json(post);
    } catch (err) {
      console.error(err);

      res.status(500).json(err);
    }
  },

  async postUpdate(req, res) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body);

      res.json(updatedPost);
    } catch (err) {
      console.error(err);

      res.status(500).json(err);
    }
  },

  async postDelete(req, res) {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);

      res.json(deletedPost);
    } catch (err) {
      console.error(err);

      res.status(500).json(err);
    }
  },
};
