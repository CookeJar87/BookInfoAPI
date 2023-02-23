import express from 'express';
import { getLandingPage, getBooks, getBookById, defaultGet } from '../controllers/gets.js';

const getRoutes = express();

getRoutes.get("/", getLandingPage);
getRoutes.get("/books", getBooks);
getRoutes.get("/books/:id", getBookById);
getRoutes.get("/*", defaultGet);

export default getRoutes;