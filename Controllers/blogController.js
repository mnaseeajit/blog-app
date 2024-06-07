const { createBlog,
     getAllBlogs, 
     getMyBlogs ,
     findBlogWithId,
     editBlogWithId,
     deleteBlogWithId
    } = require("../Models/BlogModels");
const { blogValidation } = require("../Utils/AuthUtils");
const User = require('../Models/UserModels');

const CreateBlogController = async(req,res) => {

       const{title, textBody} = req.body;
       const userId = req.session.user.user_id;
       

    try{
        
        await blogValidation({title, textBody});
      const user =  await User.findUserWithKey({key : userId});
      if(!user){
         return res.send("user not found");
      }
        
    }
    catch(error){
        return res.send({
            status : 400,
            message : "blog data error",
            error : error
        })
    }

    try{
        const blogDb = await createBlog({title,textBody,userId});
       
        return res.send({
            status : 201,
            message : "blog created successfull",
            data : blogDb
        })
    }
    catch(error){
        console.log('server',error);
         res.send({
            status : 500,
            message : "server error",
            error : error
         })
    }

         return res.send('blog created successfully');

}

const ReadBlogController = async(req,res) => {
    const SKIP = Number(req.query.skip) || 0;
    console.log(SKIP);
    try{
        const blogDb = await getAllBlogs({SKIP});
        if(blogDb.length === 0){
          return  res.send({
             status : 203,
             message : "blog not found"
          })
        }

        return res.send({
            status : 200,
            message : "read success",
            data : blogDb
        })
    }
    catch(error){
        console.log("server error",error);
       return res.send({
        status : 500,
        message : "server error",
        error : error
       })
    }
   
}

const readMyBlogsController = async(req,res)=> {
    const userId = req.session.user.user_id;
    const SKIP = Number(req.query.skip) || 0;
    console.log("user id",userId);

    try{
      const blogDb =   await getMyBlogs({userId , SKIP});
      console.log(blogDb);

      if(blogDb.length === 0){
        return res.send({
            status : 203,
            message : "no blog found"
        })
      }

      return res.send({
        status : 200,
        message : "my blog read success",
        data : blogDb
      })
    }
    catch(error){
        console.log('error',error);
        return res.send({
            status : 500,
            message : "server error",
            error : error
           })
    }

}

const editBlogController = async (req,res) => {
    console.log(req.body);
    const{title , textBody} = req.body.data;
    const userId = req.session.user.user_id;

    console.log(req.body.blogId);
    const blogId = req.body.blogId;
    
    try{
        await blogValidation({title , textBody});
    }
    catch(error){
         return res.send({
            status : 400,
            message : "invalid data"
         })
    }

    //ownership Check
    //find blog with id

    try{
       const blogDb = await findBlogWithId({blogId})
       if(!blogDb.userId.equals(userId)) {
           return res.send({
              status : 400,
              message : "not allow to edit the blog"
           })
       }

       //edit the blog in db 
       const blogPrevData = await editBlogWithId({blogId,title,textBody});
       return res.send({
        satus : 200,
        message : 'blog update successfully',
        data : blogPrevData
       })
    }
    catch(error){
        return res.send({
            status : 400,
            message : "data base error",
            error : error
         })
    }

}

const deleteBlogController = async(req,res) => {
    const blogId = req.body.blogId;
    const userId = req.session.user.user_id;

    console.log(blogId , userId);

    if(!userId){
        return res.send({
            status : 400,
            message : "missing user id"
        })
    }

    try{
         const blogDb = await findBlogWithId({blogId});
         if(!blogDb.userId.equals(userId)) {
            return res.send({
               status : 400,
               message : "not allow to delete the blog"
            })
        }

        const prevBlogDb = await deleteBlogWithId({blogId});

        return res.send({
            status : 200,
            message : "blog delete successfully",
            data : prevBlogDb
        })
    }
    catch(error){
         return res.send({
            status : 500,
            message : "internal server error",
            error : error
         })
    }
}

module.exports = {CreateBlogController ,
                 ReadBlogController,
                 readMyBlogsController,
                 editBlogController, 
                deleteBlogController};