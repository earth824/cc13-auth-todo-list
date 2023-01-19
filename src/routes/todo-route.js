const express = require('express');

const todoController = require('../controllers/todo-controller');

const router = express.Router();

router.post('/', todoController.createTodo);
router.get('/', todoController.getAllTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
