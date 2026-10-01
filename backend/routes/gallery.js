const express = require("express");

const Gallery = require("../models/Gallery");
const protect = require("../middleware/auth");

const router = express.Router();

/*
  GET ALL GALLERY ITEMS
  Public route
*/
router.get("/", async (req, res) => {
  try {
    const gallery = await Gallery.find({
      status: { $ne: "archived" },
    }).sort({
      order: 1,
      createdAt: -1,
    });

    res.json(gallery);
  } catch (error) {
    console.error("Get gallery error:", error);

    res.status(500).json({
      message: "Unable to load gallery",
    });
  }
});


/*
  GET ONE GALLERY ITEM
  Public route
*/
router.get("/:id", async (req, res) => {
  try {
    const item = await Gallery.findById(
      req.params.id
    );

    if (
      !item ||
      item.status === "archived"
    ) {
      return res.status(404).json({
        message: "Gallery item not found",
      });
    }

    res.json(item);
  } catch (error) {
    console.error(
      "Get gallery item error:",
      error
    );

    res.status(500).json({
      message: "Unable to load gallery item",
    });
  }
});


/*
  CREATE GALLERY ITEM
  Admin only
*/
router.post("/", protect, async (req, res) => {
  try {
    const item = await Gallery.create(req.body);

    res.status(201).json({
      message: "Gallery item created successfully",
      item,
    });
  } catch (error) {
    console.error(
      "Create gallery item error:",
      error
    );

    res.status(400).json({
      message: error.message,
    });
  }
});


/*
  UPDATE GALLERY ITEM
  Admin only
*/
router.put("/:id", protect, async (req, res) => {
  try {
    const item =
      await Gallery.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!item) {
      return res.status(404).json({
        message: "Gallery item not found",
      });
    }

    res.json({
      message: "Gallery item updated successfully",
      item,
    });
  } catch (error) {
    console.error(
      "Update gallery item error:",
      error
    );

    res.status(400).json({
      message: error.message,
    });
  }
});


/*
  ARCHIVE GALLERY ITEM
  Admin only
*/
router.delete("/:id", protect, async (req, res) => {
  try {
    const item =
      await Gallery.findByIdAndUpdate(
        req.params.id,
        {
          status: "archived",
        },
        {
          new: true,
        }
      );

    if (!item) {
      return res.status(404).json({
        message: "Gallery item not found",
      });
    }

    res.json({
      message: "Gallery item archived successfully",
      item,
    });
  } catch (error) {
    console.error(
      "Archive gallery item error:",
      error
    );

    res.status(500).json({
      message: "Unable to archive gallery item",
    });
  }
});


module.exports = router;