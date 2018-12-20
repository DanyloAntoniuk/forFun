/**
 * Module dependencies.
 */
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

/**
 * Mongoose Schema for Image entity.
 */
const FileSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  file: {
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

FileSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

export default mongoose.model('File', FileSchema);
