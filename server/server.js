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