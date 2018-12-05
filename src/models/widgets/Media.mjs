import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const MediaSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  video: {
    youtube: {
      videoID: {
        type: String,
        required: true,
      },
    },
    vimeo: {
      videID: {
        type: String,
        required: true,
      },
    },
  },
  image: {
    title: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
});

MediaSchema.plugin(timestamps);

export default mongoose.model('Media', MediaSchema);
