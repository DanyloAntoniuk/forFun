import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    reqiured: true,
  },
  author: {
    type: String,
    // reqiured: true,
  },
  body: {
    type: String,
    reqiured: true,
  },
});

PostSchema.plugin(timestamps);

export default mongoose.model('Post', PostSchema);
