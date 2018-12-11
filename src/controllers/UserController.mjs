/**
 * Module dependencies.
 */
import paginate from 'express-paginate';
import User from '../models/User';

export default {
  /**
   * Get single user.
   */
  async userGetOne(req, res, next) {
    try {
      const user = await User.findById(req.params.id);

      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Get all users.
   *
   * By default 10 users are return, use query params for pagination.
   * @example '/api/users?page=2&limit=5'
   */
  async userList(req, res, next) {
    try {
      const limit = Number(req.query.limit);

      const [users, count] = await Promise.all([
        User.find({})
          .limit(limit)
          .skip(req.skip)
          .lean()
          .exec(),
        User.countDocuments({}),
      ]);

      const pageCount = Math.ceil(count / req.query.limit);

      res.json({
        users,
        hasMore: paginate.hasNextPages(req)(pageCount),
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Update user.
   * TODO
   */
  async userUpdate(req, res, next) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.value.body,
        { new: true },
      );

      if (!updatedUser) {
        return res.status(404).json({ message: `User with id ${req.params.id} not found.` });
      }

      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  },
};