const express = require("express");

const Registration = require("../models/Registration");
const protect = require("../middleware/auth");

const router = express.Router();

/*
  CREATE REGISTRATION
  Public route

  The public Register page can submit
  student registration information here.
*/
router.post("/", async (req, res) => {
  try {
    const registration =
      await Registration.create(req.body);

    res.status(201).json({
      message: "Registration submitted successfully",
      registration,
    });
  } catch (error) {
    console.error(
      "Create registration error:",
      error
    );

    res.status(400).json({
      message: error.message,
    });
  }
});


/*
  GET ALL REGISTRATIONS
  Admin only
*/
router.get("/", protect, async (req, res) => {
  try {
    const registrations =
      await Registration.find().sort({
        createdAt: -1,
      });

    res.json(registrations);
  } catch (error) {
    console.error(
      "Get registrations error:",
      error
    );

    res.status(500).json({
      message: "Unable to load registrations",
    });
  }
});


/*
  GET ONE REGISTRATION
  Admin only
*/
router.get("/:id", protect, async (req, res) => {
  try {
    const registration =
      await Registration.findById(
        req.params.id
      );

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    res.json(registration);
  } catch (error) {
    console.error(
      "Get registration error:",
      error
    );

    res.status(500).json({
      message: "Unable to load registration",
    });
  }
});


/*
  UPDATE REGISTRATION
  Admin only

  This is used to change the registration
  status, for example:
  new → contacted → enrolled → closed
*/
router.put("/:id", protect, async (req, res) => {
  try {
    const registration =
      await Registration.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    res.json({
      message: "Registration updated successfully",
      registration,
    });
  } catch (error) {
    console.error(
      "Update registration error:",
      error
    );

    res.status(400).json({
      message: error.message,
    });
  }
});


/*
  DELETE REGISTRATION
  Admin only

  This permanently removes a registration.
*/
router.delete("/:id", protect, async (req, res) => {
  try {
    const registration =
      await Registration.findByIdAndDelete(
        req.params.id
      );

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    res.json({
      message:
        "Registration deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete registration error:",
      error
    );

    res.status(500).json({
      message: "Unable to delete registration",
    });
  }
});


module.exports = router;