const express = require('express');
const router = express.Router();
const authorModel= require("../models/authorModel.js")
const blogModel= require("../models/blogModel.js")

const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/authors", authorController.createUser  )

router.post("/blogs", blogController.createBlog)

module.exports = router;
