const express = require("express");

const Project = require("../models/Project");
const protect = require("../middleware/auth");

const router = express.Router();

/*
  GET ALL PROJECTS
  Public route
*/
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({
      status: { $ne: "archived" },
    })
      .populate(
        "teamMembers",
        "name photo role"
      )
      .sort({
        order: 1,
        createdAt: -1,
      });

    res.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);

    res.status(500).json({
      message: "Unable to load projects",
    });
  }
});


/*
  GET ONE PROJECT
  Public route
*/
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.id
    ).populate(
      "teamMembers",
      "name photo role"
    );

    if (
      !project ||
      project.status === "archived"
    ) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    console.error("Get project error:", error);

    res.status(500).json({
      message: "Unable to load project",
    });
  }
});


/*
  CREATE PROJECT
  Admin only
*/
router.post("/", protect, async (req, res) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error(
      "Create project error:",
      error
    );

    res.status(400).json({
      message: error.message,
    });
  }
});


/*
  UPDATE PROJECT
  Admin only
*/
router.put("/:id", protect, async (req, res) => {
  try {
    const project =
      await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error(
      "Update project error:",
      error
    );

    res.status(400).json({
      message: error.message,
    });
  }
});


/*
  ARCHIVE PROJECT
  Admin only
*/
router.delete("/:id", protect, async (req, res) => {
  try {
    const project =
      await Project.findByIdAndUpdate(
        req.params.id,
        {
          status: "archived",
        },
        {
          new: true,
        }
      );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json({
      message: "Project archived successfully",
      project,
    });
  } catch (error) {
    console.error(
      "Archive project error:",
      error
    );

    res.status(500).json({
      message: "Unable to archive project",
    });
  }
});


module.exports = router;