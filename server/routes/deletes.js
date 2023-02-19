import express from 'express';
import { deleteBookById } from '../controllers/deletes.js'

const deleteRoutes = express();

deleteRoutes.delete("/books/:id", deleteBookById);

export default deleteRoutes;