const express = require("express");
const { followUserController, followingUserListController,followerUserListController } = require("../Controllers/followController");
const followRouter = express.Router();

followRouter.post('/follow-user', followUserController);
followRouter.get('/following-list',followingUserListController);
followRouter.get('/follower-list',followerUserListController);

module.exports = followRouter;