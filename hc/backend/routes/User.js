const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db  = require("../db");

router.post("/register", async (req, res) => {
    const { username, email, password, name, rollnumber, hostelblock } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email, and password are required" });
    }
    const role = "user";
  
    if (role === "user" && (!name || !rollnumber || !hostelblock)) {
      return res.status(400).json({ error: "Users must provide name, rollnumber, and hostelblock" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    db.query(
      "INSERT INTO users (username, email, password, role, name, rollnumber, hostelblock) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [username, email, hashedPassword, role, name || null, rollnumber || null, hostelblock || null],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Username or email already exists" });
        }
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
  
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
  
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).json({ error: "Invalid email" });
      }
      console.log(results);
  
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(passwordMatch);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
  
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role },"manhaasapp", {
        expiresIn: "1h",
      });
  
      res.json({ message: "Login successful", token, user: { username: user.username, role: user.role,id: user.id } });
    });
  });

module.exports = router;