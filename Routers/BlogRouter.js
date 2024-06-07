const express = require("express");
const BlogRouter = express.Router();
const isAuth = require('../Middleware/AuthMiddleWare');
const{ 
    CreateBlogController , 
    ReadBlogController, 
    readMyBlogsController, 
    editBlogController ,
    deleteBlogController
                        } = require('../Controllers/blogController');

BlogRouter.post('/create-blog',isAuth, CreateBlogController);
BlogRouter.get('/get-blog', isAuth , ReadBlogController);
BlogRouter.get('/get-myblog',isAuth , readMyBlogsController);
BlogRouter.post('/edit-blog',isAuth , editBlogController); 
BlogRouter.post('/delete-blog',isAuth , deleteBlogController);

module.exports = BlogRouter;