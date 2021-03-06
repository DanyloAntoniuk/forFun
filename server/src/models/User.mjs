/**
 * Module dependencies.
 */
import mongoose from 'mongoose';

/**
 * Mongoose Schema for User entity.
 */
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  strategy: {
    name: {
      type: String,
      required: true,
      enum: ['local', 'google', 'github'],
    },
    email: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
    },
    id: {
      type: String,
    },
    fullName: {
      familyName: {
        type: String,
      },
      givenName: {
        type: String,
      },
    },
  },
  // local: {
  //   email: {
  //     type: String,
  //     lowercase: true,
  //   },
  //   password: {
  //     type: String,
  //   },
  // },
  // google: {
  //   id: {
  //     type: String,
  //   },
  //   email: {
  //     type: String,
  //     lowercase: true,
  //   },
  //   name: {
  //     familyName: {
  //       type: String,
  //     },
  //     givenName: {
  //       type: String,
  //     },
  //   },
  // },
  // github: {
  //   id: {
  //     type: String,
  //   },
  //   email: {
  //     type: String,
  //     lowercase: true,
  //   },
  // },
  role: {
    type: String,
    enum: ['anonymous', 'authenticated', 'editor', 'admin'],
    default: 'authenticated',
  },
}, { timestamps: true });

// Workaround on OverwriteModelError: Cannot overwrite `User` model once compiled.
// @see https://github.com/kriasoft/react-starter-kit/issues/1418#issuecomment-334957970
export default (mongoose.models && mongoose.models.User
  ? mongoose.models.User
  : mongoose.model('User', UserSchema));
