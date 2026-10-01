const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    videoUrl: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: [
        "classes",
        "workshops",
        "hackathons",
        "projects",
        "events",
        "team",
        "certificates",
        "demonstrations",
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

module.exports = mongoose.model(
  "Gallery",
  gallerySchema
);