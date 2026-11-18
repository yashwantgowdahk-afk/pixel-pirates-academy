
require("dotenv").config();

const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");

async function resetAdminPassword() {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      console.log("Admin not found!");
      process.exit(1);
    }

    admin.password = await bcrypt.hash(password, 12);
    await admin.save();

    console.log("Admin password updated successfully!");
    process.exit(0);

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

resetAdminPassword();
