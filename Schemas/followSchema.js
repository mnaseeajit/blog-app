const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowSchema = new Schema ({
       followingUserId : {
           type : Schema.Types.ObjectId,
           required : true,
           ref : "user"
       },
       followerUserId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "user"
       },
       creationDateTime : {
        type : String,
        required : true,
        default : Date.now
       }
})

module.exports = mongoose.model('follow', FollowSchema);