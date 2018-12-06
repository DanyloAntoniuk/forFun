import paginate from 'express-paginate';
import Image from '../../models/widgets/Image';

export default {
  async imageCreate(req, res, next) {
    try {
      const image = new Image(req.body);

      await image.save();

      res.status(201).json(image);
    } catch (err) {
      next(err);
    }
  },
};
