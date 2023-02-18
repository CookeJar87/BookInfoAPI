import express from 'express';
import { deleteBookById } from '../controllers/deletes.js'

const deleteRoutes = express();

deleteRoutes.delete("/book/:id", deleteBookById);

export default deleteRoutes;