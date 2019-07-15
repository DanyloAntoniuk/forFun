/**
 * Module dependencies.
 */
import paginate from 'express-paginate';
import ContentType from '../models/ContentType';

export default {
  /**
   * Create Content Type.
   * @TODO Use dynamic mongoose fields.
   */
  async contentTypeCreate(req, res, next) {
    try {
      const post = new ContentType(req.body);

      await post.save();

      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Get all content types.
   *
   * By default 10 content types are return, use query params for pagination.
   * @example '/api/content-types?page=2&limit=5'
   */
  async contentTypesList(req, res, next) {
    try {
      // Limit must be int for paginate.
      const limit = Number(req.query.limit);
      let contentTypes;
      let count;

      if (req.query.filterValue !== 'undefined') {
        [contentTypes, count] = await Promise.all([
          ContentType.find({ title: { $regex: req.query.filterValue, $options: 'i' } })
            .limit(limit)
            .skip(req.skip)
            .lean()
            .sort({ [req.query.sortField]: req.query.sortDirection })
            .exec(),
          ContentType.countDocuments({ title: { $regex: req.query.filterValue, $options: 'i' } }),
        ]);
      } else {
        [contentTypes, count] = await Promise.all([
          ContentType.find({})
            .limit(limit)
            .skip(req.skip)
            .lean()
            .sort({ [req.query.sortField]: req.query.sortDirection })
            .exec(),
          ContentType.countDocuments({}),
        ]);
      }

      if (!count) {
        return res.json({ message: 'No Content Types found.' });
      }

      const pageCount = Math.ceil(count / limit);

      return res.json({
        data: contentTypes,
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
  async contentTypeGetOne(req, res, next) {
    try {
      const { title } = req.params;
      const contentType = await ContentType.find({ title });

      if (!contentType) {
        return res.status(404).json({ message: `ContentType with title ${title} not found.` });
      }

      return res.json(contentType[0]);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Update Content Type.
   */
  async contentTypeUpdate(req, res, next) {
    try {
      const { title } = req.params;
      const updatedContentType = await ContentType.findOneAndUpdate(
        { title },
        req.body,
        { new: true },
      );

      if (!updatedContentType) {
        return res.status(404).json({ message: `Post with id ${req.params.id} not found.` });
      }

      res.json(updatedContentType[0]);
    } catch (err) {
      next(err);
    }
  },
};
