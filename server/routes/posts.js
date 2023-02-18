import express from 'express';
import { postBook } from '../controllers/posts.js'

const postRoutes = express();

postRoutes.post("/books/", postBook);

export default postRoutes;