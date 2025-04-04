const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');



router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const user_id = req.user.user_id; 
        const newTodo = await pool.query(
            'INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
            [user_id, title, description]
        );

        res.status(201).json(newTodo.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
});


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


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const result = await pool.query(
      'UPDATE todos SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *',
      [title, description, completed, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const todo_id = req.params.id;

        const deleteTodo = await pool.query(
            'DELETE FROM todos WHERE user_id = $1 AND id = $2 RETURNING *',
            [user_id, todo_id]
        );

        if (deleteTodo.rows.length === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        };

        res.json({ message: 'Todo successfully removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;