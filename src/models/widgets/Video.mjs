import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const VideoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  video: {
    youtube: {
      videoID: {
        type: String,
      },
    },
    vimeo: {
      videoID: {
        type: String,
      },
    },
  },
});

VideoSchema.plugin(timestamps);

export default mongoose.model('Video', VideoSchema);
