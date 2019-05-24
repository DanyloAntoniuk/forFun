import express from 'express';
import AuthService from '../../services/AuthService';
import AccessControlService from '../../services/AccessControlService';
// import { validateBody, schemas } from '../../helpers/schemaValidator';
import Role from '../../models/Role';

const router = express.Router();

// @TODO

router.post('/roles', AuthService.jwt(), AccessControlService.checkPermissions, async (req, res, next) => {
  try {
    const role = new Role(req.body);

    await role.save();

    res.status(201).json(role);
  } catch (err) {
    next(err);
  }
});

export default router;
