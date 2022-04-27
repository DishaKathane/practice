const blogModel= require("../models/blogModel")
const authorModel= require("../models/authorModel")
const moment = require("moment")

// const createBlog= async function (req, res) {
//   try {

//     let date1=moment().format('DD/MM/YYYY HH:MM:SS');
//     let data= req.body
        
//     if(!data.authorId){
//         return res.status(400).send({msg : "provide your author Id"})
//     }
//     let userId= await authorModel.findById(data.authorId)
//     if(!userId){
//         return res.status(400).send({msg:"invalid authorId"})
//     }
//    // (published ===true)
//       //  return //res.status(200).send({msg:date1})
     
    
//     // if(published =true){
//     //     //return res.status(200).send({msg:date1})
//     //    let data2=req.body.publishAt
//     //    data2 =true
//     // }
//     // data.isPublished=data.isPublished?data.isPublished:true
//     // data.publishedAt=data.publishedAt?new Date():new Date();
    
//     let savedData= await blogModel.create(data)
//     res.status(200).send({msg: savedData})
    
// }
// catch(err){
// console.log(err)
// res.status(500).send({msg:"error",err:err.message})
// }
// }

const createBlog = async function (req, res) {
    try {
      const id = req.body.authorId;
      const checkId = await authorModel.findById(id);
      if (!checkId)
        return res.status(400).send({ status: false, msg: "provide valid author id" });
      const blogData = req.body;
      if (blogData.isPublished === false) {
  
        const blogCreation = await blogModel.create(blogData);
        return res.status(201).send({ status: true, data: blogCreation });
      } else {
  
        blogData.publishedAt = new Date();
        const blogCreation = await blogModel.create(blogData);
  
        res.status(201).send({ status: true, data: blogCreation });
      }
    } catch (err) {
      res.status(500).send({ status: false, msg: err.message });
    }
  };
  

const collection = async function(req, res) 
{
    let authorId = req.body.authorId
    let author = await authorModel.findById(authorId)
    if(!author) 
    {
        return res.status(400).send({status: false, message: "authorId must be present"})
    }
    let blogs = await blogModel.find({isdeleted:true, ispublished:true}).select({_id : 0})
    res.status(200).send({status : true, msg : blogs })
}


const filterData = async (req,res) =>
{
    let authorId = req.query.authorId
    let category = req.query.category
    let tags = req.query.tags
    let subcategory = req.query.subcategory
    let data = await blogModel.find({authorId : authorId, category : category, tags :{$in:[tags]}, subcategory : {$in:[subcategory]} })
    res.status(200).send({status : true, msg : data})
}

const upData = async (req, res) => {
    let userId = req.params.userId;
    let user = await blogModel.findById(userId);
    if (!user) {
        return res.send("No such user exists");
    }
    // let userData = req.body;  //we need write in postman in JSON by adding tags and subcategory
    let data = req.body
    // let updatedData = await blogModel.findOneAndUpdate({ _id: userId },{$set : {title : data.title,body : data.body, tags :["small"]}})  
    let updatedData = await blogModel.findOneAndUpdate({ _id: userId }, data, { new: true })

    res.send({ status: true, data: updatedData })

}

const status = async (req, res) => {
    let userId = req.params.userId;
    let user = await blogModel.findById(userId);
    if (!user) {
        return res.send("No such user exists");
    }
    let isPublished = await blogModel.findOne({ _id: userId, isPublished: true })
    if (!isPublished) {
        return res.status(404).send("ispublished must be true")
    }
    var CurrentDate = moment().format("YYYY-MM-DD hh:mm:ss");
    let updatedData = await blogModel.findOneAndUpdate({ _id: userId }, { $set: { CurrentDate } }, { new: true, upsert: true });


    res.status(200).send({ status: true, data: updatedData })
}


// const deleteblog = async function (req, res) {

//     try {
//         let Blogid = req.params.blogId

//         let check = await blogModel.findOne({ _id: Blogid })
//         if (!check) return res.status(404).send('Blog not exist')

//         let checking = check.deleted
//         if (checking == false) {

//           let deleteBlog = await blogModel.findOneAndUpdate({ _id: Blogid }, { deleted: true, deletedAt: new Date() }, { new: true })
//             return res.status(200).send({ msg: "blog deleted successfuly" })
//         } else {
//             res.status(404).send('Blog has already deleted')
//         }
//     } catch (error) {
//         res.status(500).send({ status: false, msg: error.message });
//     }

// }


const deleteblog = async function (req, res) {

    try {
        let Blogid = req.params.blogId

        let check = await blogModel.findOne({ _id: Blogid })
        if (!check) return res.status(404).send('Blog not exist')

        let checking = check.deleted
        if (checking == false) {

            let deleteBlog = await blogModel.findOneAndUpdate({ _id: Blogid }, { deleted: true, deletedAt: new Date() }, { new: true })
            return res.status(200).send({ msg: "blog is deleted successfully" })
        } else {
            res.status(404).send({
                status: false,
                msg: "Already deleted"
            })

        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }

}


// const deleteByElememt = async function (req, res) {
//     try{
//         let data =req.query
// let check= await blogModel.find(data)
// if(!check)
// return res.status(404).send({msg:" blog document doesn't exist"})
//     console.log(check)
//     const deleteByquery=await blogModel.updateMany({$and: [data, { deleted: false }, { isPublished: false }] }, { $set: { deleted: true, deletedAt: new Date() }})
//     //if (deleteByquery.modifiedCount == 0)
//      return res.status(400).send('user already deleted')
//      if(!deleteByquery)
//      return res.status(404).send({status:false, msg: "blog not exist "}) 
// res.status(200).send({status:true, msg :deleteByquery})
// }

// catch (error) {
//     res.status(500).send({ status: false, msg: error.message });
// }
// }


const deleteBlog1 = async function(req,res)
{
    try
    {
        let filter={};
        if(req.query.category!=undefined)
        {
            filter['category']=req.query.category;
        }
        if(req.query.authorId!=undefined)
        {
            filter['authorId']=req.query.authorId;
        }
        if(req.query.tags!=undefined)
        {
            filter['tags']=req.query.tags;
        }
        if (req.query.subCategory!=undefined)
        {
            filter['subCategory']=req.query.subCategory;
        }
        if(req.query.unpublished!=undefined)
        {
            filter['isPublished']=false;
        }
        let blog = await blogModel.updateMany(filter,{$set : {isDeleted : true}});
        if(Object.keys(blog).length!=0)
        {
            res.status(200).send({status : true,msg : "Blog deleted successfully!"});
        }
        else
        {
            res.status(404).send({status : false,msg : "Blog doesn't exist!"});
        } 
    }
    catch(err)
    {
        res.status(500).send({status : false,msg : err.message});

    }
}



module.exports.createBlog= createBlog


module.exports.collection = collection
module.exports.filterData = filterData
module.exports.upData=upData
module.exports.status=status
module.exports.deleteblog = deleteblog
// module.exports.deleteByElememt=deleteByElememt
// module.exports.
module.exports.deleteBlog1 =deleteBlog1