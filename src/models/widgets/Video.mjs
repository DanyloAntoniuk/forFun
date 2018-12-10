/**
 * Module dependencies.
 */
import mongoose from 'mongoose';
// import timestamps from 'mongoose-timestamp';

/**
 * Mongoose schema for Video entity.
 */
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
}, { timestamps: true });

// VideoSchema.plugin(timestamps);

export default mongoose.model('Video', VideoSchema);
