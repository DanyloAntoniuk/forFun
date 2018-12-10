/**
 * Module dependencies.
 */
import mongoose from 'mongoose';
// import timestamps from 'mongoose-timestamp';

/**
 * Mongoose Schema for Post entity.
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
    enum: ['Unpublished', 'Published', 'Archive'],
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
}, { timestamps: true });

// PostSchema.plugin(timestamps);

export default mongoose.model('Post', PostSchema);
