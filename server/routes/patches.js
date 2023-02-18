import express from 'express';
import { patchBookById } from '../controllers/patches.js';

const patchRoutes = express();

patchRoutes.patch("/book/:id", patchBookById);

export default patchRoutes;