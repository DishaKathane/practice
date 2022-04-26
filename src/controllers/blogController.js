const blogModel= require("../models/blogModel")

const createBlog= async function (req, res) {
    let data= req.body
    
    let savedData= await blogModel.create(data)
    res.send({msg: savedData})
}

// const getUsersData= async function (req, res) {
//     let allUsers= await blogModel.find()
//     res.send({msg: allUsers})
// }

module.exports.createBlog= createBlog
// module.exports.getUsersData= getUsersData
