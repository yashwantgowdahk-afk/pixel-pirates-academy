require("dotenv").config();

const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");

async function checkAdmin() {
  try {
    await connectDB();

    console.log("Email in .env:", JSON.stringify(process.env.ADMIN_EMAIL));

    const admins = await Admin.find({});

    console.log("Number of admins:", admins.length);

    for (const admin of admins) {
      console.log("Database email:", JSON.stringify(admin.email));

      const passwordMatches = await bcrypt.compare(
        process.env.ADMIN_PASSWORD,
        admin.password
      );

      console.log("Password matches .env:", passwordMatches);
    }

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

checkAdmin();