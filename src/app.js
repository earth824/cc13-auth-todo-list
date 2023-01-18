const express = require('express');

const notFoundMiddleware = require('./middlewares/not-found');
const errorMiddleware = require('./middlewares/error');

const app = express();

// body-parser middleware
app.use(express.json());

// 404 not found middleware
app.use(notFoundMiddleware);

// error handling middleware
app.use(errorMiddleware);

app.listen(8013, () => console.log('server running on port: 8013'));
