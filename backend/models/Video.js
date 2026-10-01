const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    thumbnail: {
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

    embedUrl: {
      type: String,
      default: "",
    },

    date: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: [
        "academy-intro",
        "founder-intro",
        "project-demo",
        "workshop",
        "student-project",
        "event-highlight",
        "tutorial",
        "other",
      ],
      default: "other",
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

module.exports = mongoose.model("Video", videoSchema);