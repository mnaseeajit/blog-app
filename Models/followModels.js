const followSchema = require('../Schemas/followSchema');
const UserSchema = require('../Schemas/UserSchema');
const mongoose = require("mongoose");

const followUser = ({followerUserId , followingUserId}) => {
    return new Promise(async (resolve,reject) => {

        try{
              // check if follower alredy exist
              const followExist = await followSchema.findOne({followerUserId,followingUserId})
              if(followExist){
              return reject("already following")
              }
        }
        catch(error){
            reject(error);
        }

        const followObj = new followSchema({
            followerUserId,
            followingUserId
        })

         try{
            const followDb = await followObj.save();
            resolve(followDb)
         }
         catch(error){
            reject(error);
         }
    })
}

const getFollowingUserList = ({followerUserId}) => {
    return new Promise(async (resolve,reject)=> {
        try{
             const followingList = await followSchema.aggregate([
                {
                    $match : {followerUserId: new mongoose.Types.ObjectId(followerUserId)}
                },
                {
                    $sort : {creationDateTime : -1}
                },
                {
                    $skip : 0
                },
                {
                    $limit : 5
                }
             ])

             console.log(followingList);

             const followingUserIdsList = followingList.map(
                (follow) => follow.followingUserId
              );
        
              const followingUserInfo = await UserSchema.find({
                _id: { $in: followingUserIdsList },
              });
        
              console.log(followingList);
              console.log(followingUserIdsList);
              console.log(followingUserInfo);
        
              resolve(followingUserInfo.reverse());

        }
        catch(error){
             reject(error)
        }
        resolve();
    })
}

const getfollowerUserList = ({followingUserId}) => {
    return new Promise(async (resolve,reject)=> {
        try{
             const followerList = await followSchema.aggregate([
                {
                    $match : {followingUserId: new mongoose.Types.ObjectId(followingUserId)}
                },
                {
                    $sort : {creationDateTime : -1}
                },
                {
                    $skip : 0
                },
                {
                    $limit : 5
                }
             ])

             console.log(followerList);

             const followerUserIdsList = followerList.map(
                (follow) => follow.followerUserId
              );
        
              const followerUserInfo = await UserSchema.find({
                _id: { $in: followerUserIdsList },
              });
        
              console.log(followerList);
              console.log(followerUserIdsList);
              console.log(followerUserInfo);
        
              resolve(followerUserInfo.reverse());

        }
        catch(error){
             reject(error)
        }
        resolve();
    })
}

module.exports = {followUser , getFollowingUserList, getfollowerUserList};