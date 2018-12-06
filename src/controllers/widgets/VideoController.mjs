import paginate from 'express-paginate';
import Video from '../../models/widgets/Video';

export default {
  async videoCreate(req, res, next) {
    try {
      const video = new Video(req.body);

      await video.save();

      res.status(201).json(video);
    } catch (err) {
      next(err);
    }
  },
};
