const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: String,
      default: "",
    },

    schoolOrCollege: {
      type: String,
      default: "",
    },

    classOrYear: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    course: {
      type: String,
      default: "",
    },

    previousProgrammingExperience: {
      type: String,
      default: "",
    },

    batch: {
      type: String,
      default: "",
    },

    parentGuardianName: {
      type: String,
      default: "",
    },

    parentGuardianPhone: {
      type: String,
      default: "",
    },

    message: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "new",
        "contacted",
        "enrolled",
        "closed",
      ],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Registration",
  registrationSchema
);