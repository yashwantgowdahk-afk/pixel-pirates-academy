const express = require("express");

const TeamMember = require("../models/TeamMember");
const protect = require("../middleware/auth");

const router = express.Router();

/*
  GET ALL TEAM MEMBERS
  Public route
*/
router.get("/", async (req, res) => {
  try {
    const team = await TeamMember.find({
      status: { $ne: "archived" },
    }).sort({
      order: 1,
      createdAt: -1,
    });

    res.json(team);
  } catch (error) {
    console.error("Get team error:", error);

    res.status(500).json({
      message: "Unable to load team members",
    });
  }
});


/*
  GET ONE TEAM MEMBER
  Public route
*/
router.get("/:id", async (req, res) => {
  try {
    const member = await TeamMember.findById(
      req.params.id
    );

    if (
      !member ||
      member.status === "archived"
    ) {
      return res.status(404).json({
        message: "Team member not found",
      });
    }

    res.json(member);
  } catch (error) {
    console.error(
      "Get team member error:",
      error
    );

    res.status(500).json({
      message: "Unable to load team member",
    });
  }
});


/*
  CREATE TEAM MEMBER
  Admin only
*/
router.post("/", protect, async (req, res) => {
  try {
    const member = await TeamMember.create(
      req.body
    );

    res.status(201).json({
      message: "Team member created successfully",
      member,
    });
  } catch (error) {
    console.error(
      "Create team member error:",
      error
    );

    res.status(400).json({
      message: error.message,
    });
  }
});


/*
  UPDATE TEAM MEMBER
  Admin only
*/
router.put("/:id", protect, async (req, res) => {
  try {
    const member =
      await TeamMember.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!member) {
      return res.status(404).json({
        message: "Team member not found",
      });
    }

    res.json({
      message: "Team member updated successfully",
      member,
    });
  } catch (error) {
    console.error(
      "Update team member error:",
      error
    );

    res.status(400).json({
      message: error.message,
    });
  }
});


/*
  ARCHIVE TEAM MEMBER
  Admin only
*/
router.delete("/:id", protect, async (req, res) => {
  try {
    const member =
      await TeamMember.findByIdAndUpdate(
        req.params.id,
        {
          status: "archived",
        },
        {
          new: true,
        }
      );

    if (!member) {
      return res.status(404).json({
        message: "Team member not found",
      });
    }

    res.json({
      message: "Team member archived successfully",
      member,
    });
  } catch (error) {
    console.error(
      "Archive team member error:",
      error
    );

    res.status(500).json({
      message: "Unable to archive team member",
    });
  }
});


module.exports = router;