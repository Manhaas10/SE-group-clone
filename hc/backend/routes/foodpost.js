const express = require('express');
const db = require('../db');
const {auth} = require('../middleware/auth'); // Authentication middleware
const router = express.Router();

// Create a food-sharing post (POST)
router.post('/', auth, (req, res) => {
    const { location, post_type, title, description, price } = req.body;
    

    if (!title || !post_type || !description) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    console.log("User ID:", req.user.id);
    const sql = `INSERT INTO food_sharing_posts (user_id, location, post_type, title, description, price) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [req.user.id, location, post_type, title, description, price || 'Free'], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({ message: 'Food post created successfully', post_id: result.insertId });
    });
});

// Get all food-sharing posts (Available for all authenticated users)
router.get('/', auth, (req, res) => {
    const sql = `SELECT p.id, u.name AS user_name, p.location, p.post_type, p.title, p.description, p.price, p.created_at
                 FROM food_sharing_posts p
                 JOIN users u ON p.user_id = u.id
                 ORDER BY p.created_at DESC`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.json(results);
    });
});

// Get a specific food post by ID
router.get('/:id', auth, (req, res) => {
    const sql = `SELECT * FROM food_sharing_posts WHERE id = ?`;

    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Food post not found' });
        }
        res.json(results[0]);
    });
});

// Update a food-sharing post (Only the owner can update their post)
router.put('/:id', auth, (req, res) => {
    const { location, description, price } = req.body;

    if (!location || !description) {
        return res.status(400).json({ message: 'Required fields missing' });
    }

    db.query(
        `UPDATE food_sharing_posts SET location = ?, description = ?, price = ? WHERE id = ? AND user_id = ?`,
        [location, description, price, req.params.id, req.user.id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to update post', error: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Post not found or unauthorized' });
            }
            res.json({ message: 'Post updated successfully' });
        }
    );
});

// Delete a food-sharing post (Only the owner can delete their post)
router.delete('/:id', auth, (req, res) => {
    db.query(`DELETE FROM food_sharing_posts WHERE id = ? AND user_id = ?`, 
        [req.params.id, req.user.id], 
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to delete post', error: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Post not found or unauthorized' });
            }
            res.json({ message: 'Post deleted successfully' });
        }
    );
});

module.exports = router;