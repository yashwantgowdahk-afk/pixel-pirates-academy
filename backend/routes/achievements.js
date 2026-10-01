const express = require("express");

const Achievement = require("../models/Achievement");
const protect = require("../middleware/auth");

const router = express.Router();

/*
  GET ALL ACHIEVEMENTS
  Public route
*/
router.get("/", async (req, res) => {
  try {
    const achievements = await Achievement.find({
      status: { $ne: "archived" },
    })
      .populate("relatedProject")
      .sort({
        order: 1,
        createdAt: -1,
      });

    res.json(achievements);
  } catch (error) {
    console.error(
      "Get achievements error:",
      error
    );

    res.status(500).json({
      message: "Unable to load achievements",
    });
  }
});


/*
  GET ONE ACHIEVEMENT
  Public route
*/
router.get("/:id", async (req, res) => {
  try {
    const achievement =
      await Achievement.findById(
        req.params.id
      ).populate("relatedProject");

    if (
      !achievement ||
      achievement.status === "archived"
    ) {
      return res.status(404).json({
        message: "Achievement not found",
      });
    }

    res.json(achievement);
  } catch (error) {
    console.error(
      "Get achievement error:",
      error
    );

    res.status(500).json({
      message: "Unable to load achievement",
    });
  }
});


/*
  CREATE ACHIEVEMENT
  Admin only
*/
router.post("/", protect, async (req, res) => {
  try {
    const achievement =
      await Achievement.create(req.body);

    res.status(201).json({
      message: "Achievement created successfully",
      achievement,
    });
  } catch (error) {
    console.error(
      "Create achievement error:",
      error
    );

    res.status(400).json({
      message: error.message,
    });
  }
});


/*
  UPDATE ACHIEVEMENT
  Admin only
*/
router.put("/:id", protect, async (req, res) => {
  try {
    const achievement =
      await Achievement.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!achievement) {
      return res.status(404).json({
        message: "Achievement not found",
      });
    }

    res.json({
      message: "Achievement updated successfully",
      achievement,
    });
  } catch (error) {
    console.error(
      "Update achievement error:",
      error
    );

    res.status(400).json({
      message: error.message,
    });
  }
});


/*
  ARCHIVE ACHIEVEMENT
  Admin only
*/
router.delete("/:id", protect, async (req, res) => {
  try {
    const achievement =
      await Achievement.findByIdAndUpdate(
        req.params.id,
        {
          status: "archived",
        },
        {
          new: true,
        }
      );

    if (!achievement) {
      return res.status(404).json({
        message: "Achievement not found",
      });
    }

    res.json({
      message: "Achievement archived successfully",
      achievement,
    });
  } catch (error) {
    console.error(
      "Archive achievement error:",
      error
    );

    res.status(500).json({
      message: "Unable to archive achievement",
    });
  }
});


module.exports = router;