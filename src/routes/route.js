const express = require('express');
const router = express.Router();


const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")



router.post("/author",authorController.createAuthor)

router.post("/blogs",blogController.createBlogger)

router.get("/getBlogData",blogController.getBlogsData)

router.get("/getblog",blogController.getblog)

router.put("/updateData/:blogId",blogController.upData)

router.put("/status/:userId",blogController.status)

router.delete("/blogs/:blogId",blogController.deleteblog)

 router.delete("/deleteByElement",blogController.deleteByElement)

module.exports = router;
