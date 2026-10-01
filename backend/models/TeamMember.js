const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      default: "",
    },

    branch: {
      type: String,
      default: "",
    },

    background: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    photo: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    projects: {
      type: [String],
      default: [],
    },

    achievements: {
      type: [String],
      default: [],
    },

    certifications: {
      type: [String],
      default: [],
    },

    linkedin: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    introVideo: {
      type: String,
      default: "",
    },

    model3d: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "TeamMember",
  teamMemberSchema
);