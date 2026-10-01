const express = require("express");

const Video = require("../models/Video");
const protect = require("../middleware/auth");

const router = express.Router();

/*
  GET ALL VIDEOS
  Public route
*/
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find({
      status: { $ne: "archived" },
    }).sort({
      order: 1,
      createdAt: -1,
    });

    res.json(videos);
  } catch (error) {
    console.error("Get videos error:", error);

    res.status(500).json({
      message: "Unable to load videos",
    });
  }
});


/*
  GET ONE VIDEO
  Public route
*/
router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findById(
      req.params.id
    );

    if (
      !video ||
      video.status === "archived"
    ) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.json(video);
  } catch (error) {
    console.error("Get video error:", error);

    res.status(500).json({
      message: "Unable to load video",
    });
  }
});


/*
  CREATE VIDEO
  Admin only
*/
router.post("/", protect, async (req, res) => {
  try {
    const video = await Video.create(req.body);

    res.status(201).json({
      message: "Video created successfully",
      video,
    });
  } catch (error) {
    console.error(
      "Create video error:",
      error
    );

    res.status(400).json({
      message: error.message,
    });
  }
});


/*
  UPDATE VIDEO
  Admin only
*/
router.put("/:id", protect, async (req, res) => {
  try {
    const video =
      await Video.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.json({
      message: "Video updated successfully",
      video,
    });
  } catch (error) {
    console.error(
      "Update video error:",
      error
    );

    res.status(400).json({
      message: error.message,
    });
  }
});


/*
  ARCHIVE VIDEO
  Admin only
*/
router.delete("/:id", protect, async (req, res) => {
  try {
    const video =
      await Video.findByIdAndUpdate(
        req.params.id,
        {
          status: "archived",
        },
        {
          new: true,
        }
      );

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.json({
      message: "Video archived successfully",
      video,
    });
  } catch (error) {
    console.error(
      "Archive video error:",
      error
    );

    res.status(500).json({
      message: "Unable to archive video",
    });
  }
});


module.exports = router;