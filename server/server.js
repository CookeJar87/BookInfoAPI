// check ;'s where should they be
//Remove unnecessary console logs or comment them out.
//allow optional query params for get?
//Delete needs to triggger error 404 if delete id doesn't exist or isn't an int.
//check super picky DB requirements, duplicate titles are ok as long as one of the two other columns are different.
// look into bodyparser and more into middleware.
//port or env_var.
//test
//auth

import express from 'express';
import bodyParser from 'body-parser';
import getRoutes from './routes/gets.js';
import postRoutes from './routes/posts.js';
import patchRoutes from './routes/patches.js';
import deleteRoutes from './routes/deletes.js';

const app = express();
const port = 9000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", deleteRoutes);
app.use("/", getRoutes);
app.use("/", postRoutes);
app.use("/", patchRoutes);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}. `);
});