const { findUserWithKey } = require("../Models/UserModels");
const { followUser, getFollowingUserList , getfollowerUserList} = require("../Models/followModels");

const followUserController = async (req,res)=> {
    
    const followingUserId = req.body.followingUserId;
    const followerUserId = req.session.user.user_id;

    console.log(followingUserId , followerUserId);

    if(!followingUserId || !followerUserId){
        return res.send({
            status : 400,
            message : "user credetial missing"
        })
    }

    try{
       const followerUser =  await findUserWithKey({key : followerUserId});
       const followingUser = await findUserWithKey({key : followingUserId});

       console.log("follower user " ,followerUser ,"following user", followingUser);

       if(!followerUser || !followingUser){
        return res.send({
            status : 400,
            message : "user not found"
        })
       }
    }
    catch(error){
        return res.send({
            status : 500,
            message : "data base error",
            error : error
        })
    }

    //create entry with db
    try{
        const followDb =  await followUser({followingUserId,followerUserId});

        return res.send({
            status : 201,
            message : "follow success",
            data : followDb
        })

    }
    catch(error){
        console.log(error);
        return res.send({
            status : 500,
            message : "data base error",
            error : error
        })
    }

        
}

const followingUserListController = async (req,res) => {
    const followerUserId = req.session.user.user_id;
    const SKIP = Number(req.query.skip) || 0;
    console.log(req.session)

    try{
        const followingList = await getFollowingUserList({followerUserId});
        console.log(followingList);

        if(followingList.length === 0){
            return res.send({
                status : 203,
                message : "no following found"
            })
        }

        return res.send({
            status : 200,
            message : "read success",
            data : followingList
        })
    }
    catch(error){
        console.log(error);
        return res.send({
            status : 500,
            message : "data base error",
            error : error
        })
    }
}

const followerUserListController = async (req,res) => {
    const followingUserId = req.session.user.user_id;
    const SKIP = Number(req.query.skip) || 0;
    console.log(req.session)

    try{
        const followerList = await getfollowerUserList({followingUserId});
        console.log(followerList);

        if(followerList.length === 0){
            return res.send({
                status : 203,
                message : "no following found"
            })
        }

        return res.send({
            status : 200,
            message : "read success",
            data : followerList
        })
    }
    catch(error){
        console.log(error);
        return res.send({
            status : 500,
            message : "data base error",
            error : error
        })
    }
}



module.exports = {followUserController, followerUserListController, followingUserListController};