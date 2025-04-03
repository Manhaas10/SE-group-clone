const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const { auth } = require("../middleware/auth");
router.get("/me", auth, (req, res) => {
  res.json({ userId: req.user.id,username: req.user.username,block:req.user.hostelblock});
});
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: "Invalid Username" });
    }
    console.log(results);

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ username: user.username, id: user.id, email: user.email, role: user.role }, "manhaasapp", {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token, user: { username: user.username, id: user.id, email: user.email, role: user.role} });
  });
});

module.exports = router;
