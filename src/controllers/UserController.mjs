// import paginate from 'express-paginate';
import User from '../models/User';

export default {
  async userGetOne(req, res) {
    try {
      const user = await User.findById(req.params.id);

      res.json(user);
    } catch (err) {
      console.error(err);

      res.status(404).send();
    }
  },
};
