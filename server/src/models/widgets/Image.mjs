/**
 * Module dependencies.
 */
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
// import timestamps from 'mongoose-timestamp';

/**
 * Mongoose Schema for Image entity.
 */
const ImageSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    originalName: {
      type: String,
      required: true,
      unique: true,
    },
    size: {
      type: Number,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
}, { timestamps: true });

ImageSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

export default mongoose.model('Image', ImageSchema);
