const express = require("express");

const Event = require("../models/Event");
const protect = require("../middleware/auth");

const router = express.Router();

/*
  GET ALL EVENTS
  Public route
*/
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({
      status: { $ne: "archived" },
    }).sort({
      order: 1,
      createdAt: -1,
    });

    res.json(events);
  } catch (error) {
    console.error("Get events error:", error);

    res.status(500).json({
      message: "Unable to load events",
    });
  }
});


/*
  GET ONE EVENT
  Public route
*/
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event || event.status === "archived") {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json(event);
  } catch (error) {
    console.error("Get event error:", error);

    res.status(500).json({
      message: "Unable to load event",
    });
  }
});


/*
  CREATE EVENT
  Admin only
*/
router.post("/", protect, async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error("Create event error:", error);

    res.status(400).json({
      message: error.message,
    });
  }
});


/*
  UPDATE EVENT
  Admin only
*/
router.put("/:id", protect, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    console.error("Update event error:", error);

    res.status(400).json({
      message: error.message,
    });
  }
});


/*
  ARCHIVE EVENT
  Admin only
*/
router.delete("/:id", protect, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        status: "completed",
      },
      {
        new: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json({
      message: "Event marked as completed",
      event,
    });
  } catch (error) {
    console.error("Complete event error:", error);

    res.status(500).json({
      message: "Unable to update event",
    });
  }
});


module.exports = router;