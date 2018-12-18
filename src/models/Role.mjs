/**
 * Module dependencies.
 */
import mongoose from 'mongoose';

/**
 * Mongoose Schema for Role entity.
 */
const RoleSchema = mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ['authenticated', 'editor', 'admin'],
  },
  resource: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  attributes: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Role', RoleSchema);
