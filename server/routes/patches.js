import express from 'express';
import { patchBookById } from '../controllers/patches.js';

const patchRoutes = express();

patchRoutes.patch("/books/:id", patchBookById);

export default patchRoutes;