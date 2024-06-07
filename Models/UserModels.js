const UserSchema = require("../Schemas/UserSchema");
const bcrypt = require("bcryptjs");
const ObjectId = require('mongodb').ObjectId;

const User = class{
    constructor({name,email,username,password}){
        this.email = email;
        this.name = name;
        this.username = username;
        this.password = password;
    }


userRegistration() {
    return new Promise (async (resolve,reject)=>{
         const hashedpassword  = await bcrypt.hash(
            this.password,
            Number(process.env.SALT)
         );

         const user = new UserSchema({
             name : this.name,
             email : this.email,
             password : hashedpassword,
             username : this.username,
         })

         try{
           const userDB = await user.save();
           resolve(userDB);
         }
         catch(err){
            reject(err);
         }
    });
}

emailAndUsernameExist(){
   return new Promise (async(resolve, reject)=>{
        try{
            const userDB = await UserSchema.findOne({
                $or : [{email : this.email},{username : this.username}]
            })

            if(userDB && userDB.email === this.email) reject("email exist");
            if(userDB && userDB.username === this.username) reject("username exist");

            resolve();
        }
        catch(error){
            reject(error);
        }
   })
}

static findUserWithKey({key}){
     return new Promise(async (resolve,reject)=>{
         try{
            console.log("find");
            const userDB = await UserSchema.findOne({
                $or : [ObjectId.isValid(key) ? {_id : key} : {email : key},{username : key}]
            }).select("+password");

            console.log( "key",userDB )

            if(!userDB) reject("User not found");

            resolve(userDB);
         }
         catch(error){
            reject(error);
         }
     })
}


}


module.exports = User;