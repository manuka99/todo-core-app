require('express-async-errors');
const express = require('express');
const cors = require('cors');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const todosRouter = require('./routes/todos');

const app = express();

app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use('/todos', todosRouter);
app.use('/api', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
