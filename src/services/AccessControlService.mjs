/**
 * Module dependencies.
 */
import mongoose from 'mongoose';
import accessControl from '../helpers/accessControl';
import Role from '../models/Role';

class AccessConrolService {
  constructor() {
    this.resource = null;
    this.action = null;
    this.permission = null;

    this.checkPermissions = this.checkPermissions.bind(this);
  }

  async initPermissionsFromRequest(req) {
    [this.resource, this.action] = await Promise.all([
      accessControl.getResourceTypeFromUri(req._parsedUrl.pathname),
      accessControl.getActionFromMethod(req.method),
    ]);

    const roleActions = await Role.find({ role: req.user.role }).select('action -_id');
    this.permission = accessControl.filterPermissions(roleActions, this.action);
  }

  async checkPermissions(req, res, next) {
    await this.initPermissionsFromRequest(req);

    if (this.permission === 'own') {
      if (this.resource === 'user' && req.params.id === req.user._id.toString()) {
        next();
      }

      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  }

  async getResourceAuthor() {
    const modelName = accessControl.getModelName(this.resource);
    // const document = await mongoose.model(modelName).find({ author:  });
    // console.log(document);
  }
}

export default new AccessConrolService();
