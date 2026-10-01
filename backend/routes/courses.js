const express = require("express");

const Course = require("../models/Course");
const protect = require("../middleware/auth");

const router = express.Router();

/*
  PUBLIC:
  Get published courses only
*/
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find({
      status: "published",
    }).sort({
      order: 1,
      createdAt: -1,
    });

    res.json(courses);
  } catch (error) {
    console.error(
      "Get public courses error:",
      error
    );

    res.status(500).json({
      message: "Unable to load published courses",
    });
  }
});


/*
  ADMIN:
  Get draft + published courses
*/
router.get(
  "/admin/all",
  protect,
  async (req, res) => {
    try {
      const courses = await Course.find({
        status: {
          $ne: "archived",
        },
      }).sort({
        order: 1,
        createdAt: -1,
      });

      res.json(courses);
    } catch (error) {
      console.error(
        "Get admin courses error:",
        error
      );

      res.status(500).json({
        message: "Unable to load admin courses",
      });
    }
  }
);


/*
  PUBLIC:
  Get one published course
*/
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(
      req.params.id
    );

    if (
      !course ||
      course.status !== "published"
    ) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json(course);
  } catch (error) {
    console.error(
      "Get course error:",
      error
    );

    res.status(500).json({
      message: "Unable to load course",
    });
  }
});


/*
  ADMIN:
  Create course
*/
router.post(
  "/",
  protect,
  async (req, res) => {
    try {
      const course = await Course.create(
        req.body
      );

      res.status(201).json({
        message:
          "Course created successfully",
        course,
      });
    } catch (error) {
      console.error(
        "Create course error:",
        error
      );

      res.status(400).json({
        message: error.message,
      });
    }
  }
);


/*
  ADMIN:
  Update course
*/
router.put(
  "/:id",
  protect,
  async (req, res) => {
    try {
      const course =
        await Course.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!course) {
        return res.status(404).json({
          message: "Course not found",
        });
      }

      res.json({
        message:
          "Course updated successfully",
        course,
      });
    } catch (error) {
      console.error(
        "Update course error:",
        error
      );

      res.status(400).json({
        message: error.message,
      });
    }
  }
);


/*
  ADMIN:
  Archive course
*/
router.delete(
  "/:id",
  protect,
  async (req, res) => {
    try {
      const course =
        await Course.findByIdAndUpdate(
          req.params.id,
          {
            status: "archived",
          },
          {
            new: true,
          }
        );

      if (!course) {
        return res.status(404).json({
          message: "Course not found",
        });
      }

      res.json({
        message:
          "Course archived successfully",
        course,
      });
    } catch (error) {
      console.error(
        "Archive course error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to archive course",
      });
    }
  }
);


module.exports = router;