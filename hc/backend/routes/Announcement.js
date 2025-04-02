const express = require("express");
const router = express.Router();
const db = require("../db");
const { auth } = require("../middleware/auth");


// Get all announcements
router.get("/", (req, res) => {
  db.query("SELECT * FROM announcements ORDER BY timestamp DESC", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Get announcements by category
router.get("/category/:category", (req, res) => {
  db.query(
    "SELECT * FROM announcements WHERE category = ? ORDER BY timestamp DESC",
    [req.params.category],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    }
  );
});

// Get a specific announcement
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM announcements WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Announcement not found" });
      }
      res.json(results[0]);
    }
  );
});

// Create a new announcement (admin only)
router.post("/", auth, (req, res) => {
  const { title, content, category, has_attachment, attachment_url } = req.body;
  
  if (!title || !content || !category) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  db.query(
    "INSERT INTO announcements (title, content, category, has_attachment, attachment_url, admin_id) VALUES (?, ?, ?, ?, ?, ?)",
    [title, content, category, has_attachment || false, attachment_url, req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to create announcement" });
      }
      res.status(201).json({ 
        message: "Announcement created successfully", 
        id: result.insertId 
      });
    }
  );
});

// Update an announcement (admin only)
router.put("/:id", auth, (req, res) => {
  const { title, content, category, has_attachment, attachment_url } = req.body;
  
  if (!title || !content || !category) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  db.query(
    "UPDATE announcements SET title = ?, content = ?, category = ?, has_attachment = ?, attachment_url = ? WHERE id = ?",
    [title, content, category, has_attachment || false, attachment_url, req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to update announcement" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Announcement not found" });
      }
      res.json({ message: "Announcement updated successfully" });
    }
  );
});

// Delete an announcement (admin only)
router.delete("/:id", auth, (req, res) => {
  db.query(
    "DELETE FROM announcements WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to delete announcement" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Announcement not found" });
      }
      res.json({ message: "Announcement deleted successfully" });
    }
  );
});

module.exports = router;