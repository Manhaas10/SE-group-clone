const express = require("express");
const router = express.Router();
const db = require("../db");
const { auth } = require("../middleware/auth");
const multer = require("multer");

// Multer setup: Store file in memory as a buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// 🔹 GET All Items
router.get("/", (req, res) => {
  db.query("SELECT id, name, description, location, status, reported_by, additional_details, date,image FROM lost_found_items ORDER BY date DESC",
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    }
  );
});


// 🔹 GET a Single Item (With Image)
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

      // Convert buffer to base64 string
      const item = results[0];
      if (item.image) {
        item.image = `data:image/jpeg;base64,${item.image.toString("base64")}`;
      }

      res.json(item);
    }
  );
});


// 🔹 POST New Lost/Found Item (With Image)
router.post("/", auth, upload.single("image"), (req, res) => {
  const { name, description, location, status, additional_details } = req.body;
  const image = req.file ? req.file.buffer : null; // Get image buffer

  if (!name || !description || !location || !status) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  db.query(
    "INSERT INTO lost_found_items (name, description, location, status, reported_by, additional_details, image, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [name, description, location, status, req.user.email, additional_details, image, req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to create item" });
      }
      res.status(201).json({ message: "Item created successfully", id: result.insertId });
    }
  );
});


// 🔹 UPDATE Lost/Found Item (With Image)
router.put("/:id", auth, upload.single("image"), (req, res) => {
  const { name, description, location, status, additional_details } = req.body;
  const image = req.file ? req.file.buffer : null;

  if (!name || !description || !location || !status) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  db.query(
    "UPDATE lost_found_items SET name = ?, description = ?, location = ?, status = ?, additional_details = ?, image = ? WHERE id = ?",
    [name, description, location, status, additional_details, image, req.params.id],
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


// 🔹 UPDATE Status of an Item
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


// 🔹 DELETE Lost/Found Item
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
