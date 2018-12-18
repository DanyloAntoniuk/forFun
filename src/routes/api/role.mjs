import express from 'express';
// import AuthService from '../../services/AuthService';
// import { validateBody, schemas } from '../../helpers/schemaValidator';
// import AuthController from '../../controllers/AuthController';
import Role from '../../models/Role';

const router = express.Router();

router.post('/roles', async (req, res, next) => {
  try {
    const role = new Role(req.body);

    await role.save();

    res.status(201).json(role);
  } catch (err) {
    next(err);
  }
});

export default router;
