const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId
const moment = require("moment")

//let Date= moment().format('YYYY-MM-DD HH:MM:SS');
let date = moment().format('DD/MM/YYYY');
console.log(date)

const blogSchema = new mongoose.Schema({

    "title": {
        type: String,
        required: true
    },
    "body": {
        type: String,
        required: true
    },
    "authorId": {
        type: objectId, ref: "author"
    },
    "tags": [String],
    "category": {
        type: String,
        required: true
    },
    "subcategory": [String],
    "isPublished": {
        type: Boolean,
        default: false
    },
    "publishedAt": Date, // if published is true publishedAt will have a date 2021-09-17T04:25:07.803Z
    "deleted": {
        type: Boolean,
        default: false
    },
    "deletedAt": Date, // if deleted is true deletedAt will have a date 2021-09-17T04:25:07.803Z,
     date:{
         type:String,
         default:date
     }

}, { timestamps: true })

module.exports = mongoose.model("blog", blogSchema)
