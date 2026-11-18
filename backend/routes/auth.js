
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    console.log("\n========== ADMIN LOGIN ==========");

    const { email, password } = req.body || {};

    // 1. Validate input
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      console.log("Login failed: Missing or invalid input");

      return res.status(400).json({
        message: "Please enter a valid email and password",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    console.log("Email received:", cleanEmail);

    // 2. Find admin in MongoDB
    const admin = await Admin.findOne({
      email: cleanEmail,
    });

    console.log("Admin found:", !!admin);

    if (!admin) {
      console.log("Login failed: Admin account not found");

      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    console.log("Admin active:", admin.active);

    // 3. Check admin account status
    if (admin.active !== true) {
      console.log("Login failed: Admin account inactive");

      return res.status(403).json({
        message: "Admin account is inactive",
      });
    }

    // 4. Check submitted password against .env
    console.log(
      "Submitted password matches .env:",
      password === process.env.ADMIN_PASSWORD
    );

    // 5. Compare password with stored database hash
    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    );

    console.log("Password matched:", passwordMatch);

    if (!passwordMatch) {
      console.log("Login failed: Password does not match");

      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 6. Check JWT configuration
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in backend .env");

      return res.status(500).json({
        message: "Server authentication configuration error",
      });
    }

    // 7. Generate login token
    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    console.log("Login successful for:", admin.email);
    console.log("================================\n");

    // 8. Send response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Server error during login",
    });
  }
});

module.exports = router;
