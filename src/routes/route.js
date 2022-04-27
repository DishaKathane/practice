const express = require('express');
const router = express.Router();
const authorModel= require("../models/authorModel.js")
const blogModel= require("../models/blogModel.js")

const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/author", authorController.createUser  )

router.post("/blogs", blogController.createBlog)
router.get("/getBlogData", blogController.collection)
router.get("/getBlogs", blogController.filterData)
router.put("/updateData/:userId",blogController.upData)
router.put("/status/:userId",blogController.status)
router.delete("/blogs/:blogId", blogController.deleteblog)
router.delete("/blogs", blogController.deleteBlog1 )

module.exports = router;
