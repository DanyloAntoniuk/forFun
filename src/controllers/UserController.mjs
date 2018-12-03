import paginate from 'express-paginate';
import User from '../models/User';

export default {
  async userGetOne(req, res, next) {
    try {
      const user = await User.findById(req.params.id);

      res.json(user);
    } catch (err) {
      next(err);
    }
  },

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

  async userUpdate(req, res) {},
};
