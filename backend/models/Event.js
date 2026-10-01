const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      default: "",
    },

    time: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    organizer: {
      type: String,
      default: "",
    },

    poster: {
      type: String,
      default: "",
    },

    registrationUrl: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "upcoming",
        "registration-open",
        "completed",
      ],
      default: "upcoming",
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

module.exports = mongoose.model("Event", eventSchema);