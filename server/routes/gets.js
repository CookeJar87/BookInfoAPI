import express from 'express';
import { getLandingPage, getBooks, getBookById } from '../controllers/gets.js'

const getRoutes = express();

getRoutes.get("/", getLandingPage);
getRoutes.get("/books", getBooks);
getRoutes.get("/book/:id", getBookById);

export default getRoutes;