import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

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
  widgets: [{
    fieldType: {
      type: String,
    },
    body: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'fieldType',
    },
  }],
});

PostSchema.plugin(timestamps);

export default mongoose.model('Post', PostSchema);
