const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    username : {
        type : String,
        required : true,
        unique : true,
        minLength : 3,
        maxLength : 50,
    },
    password : {
        type : String,
        required : true,
        select : false,
    }
});

module.exports = mongoose.model("user",UserSchema);