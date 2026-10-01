const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    studentOrTeam: {
      type: String,
      default: "",
    },

    eventName: {
      type: String,
      default: "",
    },

    date: {
      type: String,
      default: "",
    },

    organization: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    certificate: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    videoUrl: {
      type: String,
      default: "",
    },

    relatedProject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
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
  "Achievement",
  achievementSchema
);