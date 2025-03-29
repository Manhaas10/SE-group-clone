const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in "uploads/" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

// Multer Upload Middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  }
});

// GET all late entry requests
router.get("/", auth, (req, res) => {
  const query = req.user.role === "admin"
    ? "SELECT * FROM late_entry_requests ORDER BY timestamp DESC"
    : "SELECT * FROM late_entry_requests WHERE user_id = ? ORDER BY timestamp DESC";

  const params = req.user.role === "admin" ? [] : [req.user.id];

  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// GET late entry requests by status
router.get("/status/:status", auth, (req, res) => {
  db.query(
    "SELECT * FROM late_entry_requests WHERE status = ? ORDER BY timestamp DESC",
    [req.params.status],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    }
  );
});

// GET a single late entry request by ID
router.get("/:id", auth, (req, res) => {
  const query = req.user.role === "admin"
    ? "SELECT * FROM late_entry_requests WHERE id = ?"
    : "SELECT * FROM late_entry_requests WHERE id = ? AND user_id = ?";

  const params = req.user.role === "admin"
    ? [req.params.id]
    : [req.params.id, req.user.id];

  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.json(results[0]);
  });
});

// POST a new late entry request (with file upload)
router.post("/", auth, upload.single("attachment"), (req, res) => {
  const { reason } = req.body;

  if (!reason) {
    return res.status(400).json({ error: "Reason is required" });
  }

  if (!req.file) {
    return res.status(400).json({ error: "Attachment is required" });
  }

  const fileUrl = `/uploads/${req.file.filename}`; // Store file path

  db.query("SELECT rollnumber FROM users WHERE id = ?", [req.user.id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(500).json({ error: "Failed to retrieve user information" });
    }

    const student_id = results[0].rollnumber;

    db.query(
      "INSERT INTO late_entry_requests (student_id, reason, attachment_name, attachment_url, user_id) VALUES (?, ?, ?, ?, ?)",
      [student_id, reason, req.file.originalname, fileUrl, req.user.id],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Failed to create request" });
        }
        res.status(201).json({ message: "Late entry request submitted successfully", id: result.insertId });
      }
    );
  });
});

// PUT update a late entry request (with optional file upload)
router.put("/:id", auth, upload.single("attachment"), (req, res) => {
  const { reason } = req.body;

  if (!reason) {
    return res.status(400).json({ error: "Reason is required" });
  }

  let query = "UPDATE late_entry_requests SET reason = ?";
  let params = [reason];

  if (req.file) {
    query += ", attachment_name = ?, attachment_url = ?";
    params.push(req.file.originalname, `/uploads/${req.file.filename}`);
  }

  query += " WHERE id = ? AND user_id = ? AND status = 'pending'";
  params.push(req.params.id, req.user.id);

  db.query(query, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update request" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Request not found, already processed, or you don't have permission" });
    }
    res.json({ message: "Request updated successfully" });
  });
});

// PATCH update request status (Admin Only)
router.patch("/:id/status", auth, (req, res) => {
  const { status } = req.body;

  if (!status || !['pending', 'approved', 'declined'].includes(status)) {
    return res.status(400).json({ error: "Valid status required" });
  }

  db.query(
    "UPDATE late_entry_requests SET status = ? WHERE id = ?",
    [status, req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to update status" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Request not found" });
      }
      res.json({ message: "Status updated successfully" });
    }
  );
});

// DELETE a late entry request
router.delete("/:id", auth, (req, res) => {
  const query = req.user.role === "admin"
    ? "DELETE FROM late_entry_requests WHERE id = ?"
    : "DELETE FROM late_entry_requests WHERE id = ? AND user_id = ? AND status = 'pending'";

  const params = req.user.role === "admin"
    ? [req.params.id]
    : [req.params.id, req.user.id];

  db.query(query, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete request" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Request not found, already processed, or you don't have permission" });
    }
    res.json({ message: "Request deleted successfully" });
  });
});

module.exports = router;
