import mongoose from 'mongoose';

export default {
  /**
   * Available actions.
   */
  actions: {
    GET: 'read',
    POST: 'create',
    PUT: 'update',
    DELETE: 'delete',
  },

  /**
   * Get collection names from Mongo.
   *
   * @returns {Array} Collection names.
   */
  async getResourceNames() {
    const { collections } = mongoose.connections[0];

    return Object.keys(collections);
  },

  /**
   * Parse URI and get resource type based on collection names from Mongo.
   *
   * @param {String} uri Request URI.
   * @returns {String} Resource type name.
   */
  async getResourceTypeFromUri(uri) {
    const resourceNames = await this.getResourceNames();

    const match = uri.split('/').map((el) => {
      // Skip empty string and Mongo ObjectId.
      if (el.length && !el.match(/^[a-f\d]{24}$/i)) {
        // Mongoose pluralize all model names, so check it first.
        const isPlural = el.charAt(el.length - 1) === 's';

        if (isPlural && resourceNames.includes(el)) {
          return el.slice(0, -1);
        }

        // If not, check if each part of uri is substring of resource name.
        const isSubstring = resourceNames.map(name => name.indexOf(el) !== -1);

        if (isSubstring) {
          return el;
        }
      }
    });

    // Filter all undefined values.
    return match.filter(Boolean)[0];
  },

  /**
   * Get action for resource from request method.
   *
   * @param {String} method Request method.
   * @returns {String} Action for given method.
   */
  async getActionFromMethod(method) {
    return this.actions[method];
  },

  /**
   * Filter all actions for user role with given action.
   *
   * @param {Array} roleActions All role actions.
   * @param {String} action Action to filter.
   * @returns {String} Permission for given action.
   */
  async filterPermissions(roleActions, action) {
    const leanActions = roleActions.map(el => el.action);

    const leanAction = leanActions.map((el) => {
      if (el.indexOf(action) !== -1) {
        return el.substring(action.length + 1);
      }
    });

    return leanAction.filter(Boolean)[0];
  },

  async getModelName(resource) {
    return resource.charAt(0).toUpperCase() + resource.substring(1);
  },
};
