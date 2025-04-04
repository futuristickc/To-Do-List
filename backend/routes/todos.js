const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');


//create a new todo (post)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const user_id = req.user.user_id; //get user id from jwt

        const newTodo = await pool.query(
            'INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
            [user_id, title, description]
        );

        res.status(201).json(newTodo.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
});

//Get all todos for logged-in user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user_id = req.user.user_id;

        const todos = await pool.query(
            'SELECT * FROM todos WHERE user_id =$1 ORDER BY created_at DESC',
            [user_id]
        );

        res.json(todos.rows);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

//update a todo PUT request
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const user_id = req.user.user_id;
        const todo_id = req.params.id

        const updateTodo = await pool.query(
            'UPDATE todos SET title = $1, description = $2, completed = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
            [title, description, completed, todo_id, user_id]
        );

        if (updateTodo.rows.length === 0 ) {
            return res.status(404).json({ message: 'Todo not found'})
        };

        res.json(updateTodo.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

//Delete a todo (DELETE)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const todo_id = req.params.id;

        const deleteTodo = await pool.query(
            'DELETE FROM todos WHERE user_id = $1 AND id = $2 RETURNING *',
            [todo_id, user_id]
        );

        if (deleteTodo.rows.length === 0) {
            res.status(404).json({ message: 'Todo not found' });
        };

        res.json({ message: 'Todo successfully removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;