/**
 * Module dependencies.
 */
import mongoose from 'mongoose';

// @TODO Add more
const FIELD_TYPES = ['input', 'select'];

/**
 * Mongoose Schema for ContentType entity.
 *
 * @todo Create dynamic schema for content types.
 */
const ContentTypeSchema = mongoose.Schema({
  title: {
    type: String,
    reqiured: true,
  },
  // author: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   reqiured: true,
  // },
  fields: [{
    fieldTitle: {
      type: String,
      required: true,
    },
    fieldType: {
      type: String,
      reqiured: true,
      enum: FIELD_TYPES,
    },
    required: {
      type: Boolean,
      default: true,
    },
  }],
}, { timestamps: true });

export default mongoose.model('ContentType', ContentTypeSchema);
