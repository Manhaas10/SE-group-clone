const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const db = require("../db");
router.get("/", (req, res) => {
  db.query("SELECT * FROM lost_found_items ORDER BY date DESC", (err, results) => {
    if (err) {  
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM lost_found_items WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json(results[0]);
    }
  );
});

router.post("/", auth, (req, res) => {
  const { name, description, location, status, additional_details, image_url } = req.body;
  
  if (!name || !description || !location || !status) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  db.query(
    "INSERT INTO lost_found_items (name, description, location, status, reported_by, additional_details, image_url, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [name, description, location, status, req.user.email, additional_details, image_url, req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to create item" });
      }
      res.status(201).json({ 
        message: "Item created successfully", 
        id: result.insertId 
      });
    }
  );
});

router.put("/:id", auth, (req, res) => {
  const { name, description, location, status, additional_details, image_url } = req.body;
  
  if (!name || !description || !location || !status) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  db.query(
    "UPDATE lost_found_items SET name = ?, description = ?, location = ?, status = ?, additional_details = ?, image_url = ? WHERE id = ?",
    [name, description, location, status, additional_details, image_url, req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to update item" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json({ message: "Item updated successfully" });
    }
  );
});

router.patch("/:id/status", auth, (req, res) => {
  const { status } = req.body;
  
  if (!status || !['lost', 'found', 'claimed'].includes(status)) {
    return res.status(400).json({ error: "Valid status required" });
  }

  db.query(
    "UPDATE lost_found_items SET status = ? WHERE id = ?",
    [status, req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to update status" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json({ message: "Status updated successfully" });
    }
  );
});


router.delete("/:id", auth, (req, res) => {
  db.query(
    "DELETE FROM lost_found_items WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to delete item" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json({ message: "Item deleted successfully" });
    }
  );
});

module.exports = router;