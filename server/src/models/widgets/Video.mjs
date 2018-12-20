/**
 * Module dependencies.
 */
import mongoose from 'mongoose';

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

export default mongoose.model('Video', VideoSchema);
