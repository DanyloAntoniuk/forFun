/**
 * Module dependencies.
 */
import mongoose from 'mongoose';
import accessControl from '../helpers/accessControl';
import Role from '../models/Role';
import User from '../models/User';

/**
 * Service for checking user role permissions.
 */
class AccessConrolService {
  constructor() {
    this.resource = null;
    this.action = null;
    this.permission = null;

    this.checkPermissions = this.checkPermissions.bind(this);
  }

  /**
   * Initialize resource, action and permission based on each upcoming request.
   *
   * @param {Object} req Express request object.
   */
  async initPermissionsFromRequest(req) {
    [this.resource, this.action] = await Promise.all([
      accessControl.getResourceTypeFromUri(req._parsedUrl.pathname),
      accessControl.getActionFromMethod(req.method),
    ]);

    const roleActions = await Role.find({ role: req.user.role, resource: this.resource }).select('action -_id');
    this.permission = accessControl.filterPermissions(roleActions, this.action);
  }

  /**
   * Express middleware for checking user role permissions.
   */
  async checkPermissions(req, res, next) {
    await this.initPermissionsFromRequest(req);

    // Return as early as posisble.
    if (!this.permission) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Two types of permissions are available: 'own' and 'any'.
    // Own means user can action only with own created resources or user account.
    if (this.permission === 'own') {
      // Check for user account first.
      if (this.resource === 'user' && req.params.id === req.user._id.toString()) {
        return next();
      }

      // Anything else are resources created by the user.
      const author = await this.getResourceAuthor(req);
      if (req.user._id.toString() === author) {
        return next();
      }

      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Skip permission check for role with permission 'any'.
    next();
  }

  /**
   * Get author id for resource.
   *
   * @param {Object} req Express request object.
   * @returns {String|null} Author id for resource or null if no author found.
   */
  async getResourceAuthor(req) {
    const modelName = accessControl.getModelName(this.resource);
    const document = await mongoose.model(modelName).findById(req.params.id);

    if (document && document.author) {
      const author = await User.findById(document.author);

      if (author) {
        return document.author.toString();
      }
    }

    return null;
  }
}

export default new AccessConrolService();
