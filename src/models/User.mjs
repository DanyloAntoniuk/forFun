import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const UserSchema = mongoose.Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'github'],
    required: true,
  },
  local: {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  google: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
  github: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
  role: {
    type: String,
    enum: ['anonymous', 'authenticated', 'editor', 'admin'],
    default: 'anonymous',
  },
});

UserSchema.plugin(timestamps);

// Workaround on OverwriteModelError: Cannot overwrite `User` model once compiled.
// @see https://github.com/kriasoft/react-starter-kit/issues/1418#issuecomment-334957970
export default (mongoose.models && mongoose.models.User
  ? mongoose.models.User
  : mongoose.model('User', UserSchema));
