
require("dotenv").config();

const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");

const resetAdminPassword = async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL;
    const newPassword = process.env.ADMIN_PASSWORD;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      console.log("Admin not found. Run seedAdmin.js first.");
      process.exit(1);
    }

    admin.password = await bcrypt.hash(newPassword, 12);
    await admin.save();

    console.log("Admin password updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Password reset error:", error);
    process.exit(1);
  }
};

resetAdminPassword();

