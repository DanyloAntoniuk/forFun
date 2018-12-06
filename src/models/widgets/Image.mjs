import mongoose from 'mongoose';
// import timestamps from 'mongoose-timestamp';

const ImageSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    title: {
      type: String,
    },
    alt: {
      type: String,
    },
    path: {
      type: String,
    },
  },
}, { timestamps: true });

// ImageSchema.plugin(timestamps);

export default mongoose.model('Image', ImageSchema);
