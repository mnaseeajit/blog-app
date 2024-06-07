const BlogSchema = require('../Schemas/BlogSchema');
const mongoose = require("mongoose");

const createBlog = ({title , textBody , userId}) => {
    return new Promise( async(resolve,reject)=>{

        const blogObj = new BlogSchema({
            title : title,
            textBody : textBody,
            userId : userId
        })

        try{
             const BlogObj = await blogObj.save();
             resolve(BlogObj);
        }
        catch(error){
            reject(error);
        }

    })
}

const getAllBlogs = ({SKIP}) => {
    return new Promise(async (resolve,reject)=> {
          //skip , limit , sort
          try{
             const blogDb = await BlogSchema.aggregate([
                {
                    $sort : {CreationDateTime : -1}
                },
                {
                    $skip : SKIP
                },
                {
                    $limit : 5
                }
             ])
             console.log(blogDb);
             resolve(blogDb);
          }
          catch(error){
               reject(error);
          }
    })
}

const getMyBlogs = ({userId,SKIP}) => {
   return new Promise(async (resolve,reject)=> {
       //sort, skip,limit
       try{
        const objectUserId = new mongoose.Types.ObjectId(userId);
        console.log("object",objectUserId);
          const myBlogDb = await BlogSchema.aggregate([
            {
                $match : {userId : objectUserId}
            },
            {
                $sort : {creationDateTime : -1}
            },
            {
                $skip : SKIP
               
            },
            {
                $limit : 5
            }
          ])

          console.log("get my blogs",myBlogDb);

          resolve(myBlogDb);
       }
       catch(error){
           reject(error);
       }
   })
}

const findBlogWithId = ({blogId}) => {
    return new Promise(async (resolve,reject)=> {
        if(!blogId) reject("missing blogId");
          try{
            //const objectBlogId = new mongoose.Types.ObjectId(blogId);
             const blog = BlogSchema.findOne({_id : blogId});
             if(!blog) reject(`blog not found with ${blogId}`)

             resolve(blog);
          }
          catch(error){
              reject(error);
          }
    })
}

const editBlogWithId = ({blogId,title,textBody}) => {
    return new Promise(async (resolve, reject)=> {
        const newBlogData = {};
        if(title) newBlogData.title = title;
        if(textBody) newBlogData.textBody = textBody;
        
        console.log(newBlogData);
        try{
           const prevBlogData = await BlogSchema.findOneAndUpdate({_id : blogId},newBlogData);

           resolve(prevBlogData);
        }
        catch(error){
            reject(error);
        }
    })
}

const deleteBlogWithId = ({blogId}) => {
    return new Promise(async (resolve,reject)=> {

        try{
            const prevBlogDb = await BlogSchema.findOneAndDelete({_id: blogId});
            resolve(prevBlogDb)
        }
        catch(error){
           reject(error);
        }
    })
}

module.exports = {createBlog, getAllBlogs , getMyBlogs, findBlogWithId, editBlogWithId, deleteBlogWithId};