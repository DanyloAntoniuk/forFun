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
          Post.find({ title: { $regex: req.query.filterValue, $options: 'i' }, relatedTo: { $exists: false } })
            .populate('author')
            // .populate('widgets.id')
            .limit(limit)
            .skip(req.skip)
            .lean()
            .sort({ [req.query.sortField]: req.query.sortDirection })
            .exec(),
          Post.countDocuments({ title: { $regex: req.query.filterValue, $options: 'i' }, relatedTo: { $exists: false } }),
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

      const relatedPosts = await Post.find({ relatedTo: post[0]._id });

      return res.json({
        currentPost: post[0],
        relatedPosts,
      });
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
      const { title } = req.value.body;

      const post = await Post.find({ title });

      if (post.length) {
        return res.status(422).json({ message: 'Post title has to be unique.' });
      }

      const newPost = new Post(req.value.body);

      await newPost.save();

      res.status(201).json(newPost);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Update post.
   */
  async postUpdate(req, res, next) {
    try {
      const { title } = req.params;

      const [previousPost, updatedPost] = await Promise.all([
        Post.findOne({ title })
          .select(['-_id'])
          .populate('author')
          .populate('widgets.image'),
        Post.findOneAndUpdate(
          { title: req.params.title },
          req.value.body,
          { new: true },
        ),
      ]);

      const newPost = new Post(previousPost);
      newPost.isNew = true;
      newPost.title = `${newPost.title}-${newPost._id}`;
      newPost.relatedTo = updatedPost._id;

      await newPost.save();

      if (!updatedPost) {
        return res.status(404).json({ message: `Post with title ${req.params.title} not found.` });
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
        return res.status(404).json({ message: `Post with title ${req.params.id} not found.` });
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
