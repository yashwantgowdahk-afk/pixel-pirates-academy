require("dotenv").config();

const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const Admin = require("./models/Admin");

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      12
    );

    await Admin.create({
      name: "Pixel Pirates Administrator",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin account created successfully.");

    process.exit(0);
  } catch (error) {
    console.error("Admin seed error:", error.message);
    process.exit(1);
  }
};

seedAdmin();