/**
 * Module dependencies.
 */
import mongoose from 'mongoose';

/**
 * Mongoose Schema for Post entity.
 *
 * @todo Create dynamic schema for content types.
 */
const PostSchema = mongoose.Schema({
  title: {
    type: String,
    reqiured: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    reqiured: true,
  },
  status: {
    type: String,
    reqiured: true,
    enum: ['Unpublished', 'Published', 'Archived'],
  },
  widgets: [{
    fieldType: {
      type: String,
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'widgets.fieldType',
    },
  }],
  fields: [{}],
}, { timestamps: true });

export default mongoose.model('Post', PostSchema);
