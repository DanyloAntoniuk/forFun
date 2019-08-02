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
  relatedTo: {
    type: String,
  },
  // contentType: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'ContentType',
  //   reqiured: true,
  // },
  createdAt: {
    type: Date,
    reqiured: true,
  },
  updatedAt: {
    type: Date,
    reqiured: true,
    default: Date.now,
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
    image: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'widgets.fieldType',
    },
  }],
  fields: {},
});

export default mongoose.model('Post', PostSchema);
