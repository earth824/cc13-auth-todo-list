// const { sequelize } = require('./models');
// sequelize.sync({ force: true });

require('dotenv').config();
const express = require('express');

const authRoute = require('./routes/auth-route');
const todoRoute = require('./routes/todo-route');
const notFoundMiddleware = require('./middlewares/not-found');
const errorMiddleware = require('./middlewares/error');
const authenticateMiddleware = require('./middlewares/authenticate');

const app = express();

// body-parser middleware
app.use(express.json());

// auth router middleware
app.use('/auth', authRoute);
// todo router middleware
app.use('/todos', authenticateMiddleware, todoRoute);

// 404 not found middleware
app.use(notFoundMiddleware);

// error handling middleware
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log('server running on port: ' + port));
