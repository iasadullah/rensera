const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const db = require("../models/Indesign");
const { check, validationResult } = require("express-validator");
const config = require("../Config");
router.get("/templateList", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM templates");
    res.json({ statusCode: 200, response: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post(
  "/createTemplate",
  [
    // Validate input
    check("name").notEmpty().withMessage("Name is required"),
    check("image").notEmpty().withMessage("Image is required"),
    check("description").notEmpty().withMessage("Description is required"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ statusCode: 400, errors: errors.array() });
      }

      const { name, image, description } = req.body;

      const buffer = Buffer.from(image, "base64");
      const filename = new Date().toISOString().replace(/:/g, "-") + ".png";
      const filePath = path.join(config.imagePath, filename);

      fs.writeFile(filePath, buffer, async (err) => {
        if (err) {
          return next(err);
        }

        try {
          const result = await db.query(
            "INSERT INTO templates (name, image, description) VALUES ($1, $2, $3) RETURNING *",
            [name, filePath, description]
          );
          res.status(201).json({
            statusCode: 201,
            data: result.rows[0],
          });
        } catch (err) {
          if (err.constraint === "templates_name_unique") {
            res
              .status(400)
              .json({ statusCode: 400, error: "Template name already exists" });
          } else {
            next(err);
          }
        }
      });
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
