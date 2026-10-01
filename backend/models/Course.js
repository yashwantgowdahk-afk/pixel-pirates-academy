const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: true }
);

const moduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },

    topics: {
      type: [topicSchema],
      default: [],
    },

    objectives: {
      type: [String],
      default: [],
    },

    activities: {
      type: [String],
      default: [],
    },

    project: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
  },
  { _id: true }
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    duration: {
      type: String,
      default: "",
    },

    objectives: {
      type: [String],
      default: [],
    },

    practicalActivities: {
      type: [String],
      default: [],
    },

    resources: {
      type: [String],
      default: [],
    },

    modules: {
      type: [moduleSchema],
      default: [],
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

module.exports = mongoose.model("Course", courseSchema);