const blogModel= require("../models/blogModel")
const authorModel= require("../models/authorModel")

const createBlog= async function (req, res) {
  try {
        let data= req.body
    if(!data.authorId){
        return res.status(400).send({msg : "provide your author Id"})
    }
    let userId= await authorModel.findById(data.authorId)
    if(!userId){
        return res.status(400).send({msg:"invalid authorId"})
    }

    let savedData= await blogModel.create(data)
    res.status(200).send({msg: savedData})
}
catch(err){
console.log(err)
res.status(500).send({msg:"error",err:err.message})
}
}


// const getUsersData= async function (req, res) {
//     let allUsers= await blogModel.find()
//     res.send({msg: allUsers})
// }

module.exports.createBlog= createBlog
// module.exports.getUsersData= getUsersData
