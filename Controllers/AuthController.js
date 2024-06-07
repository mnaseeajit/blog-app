const bcrypt = require("bcryptjs");
const User = require("../Models/UserModels");
const {userDataValidation} = require("../Utils/AuthUtils")

const registerController = async (req,res) => {
    console.log("register");
    
    const {email,password,username,name} = req.body;
    console.log(req.body);

    // data validation
    try{
        await userDataValidation({name, email, username, password});
    }
    catch(error){
        return res.send({
            status : 400,
            message : "invalid user data",
            error : error,
        })
    }

    //username & email already exist

    // save data in db
    const userObj = new User({email,password,username,name});

    try{
        await userObj.emailAndUsernameExist();
    }
    catch(error){
         return res.send({
            status : 400,
            message : "user alredy exist",
            error : error,
         })
    }

    try{
        const userDB = await userObj.userRegistration();
        console.log(userDB);

        return res.send({
            status : 201,
            message : "user register successfully",
            data : userDB,
        })
    }
    catch(error){
        return res.send({
            status : 500,
            message : "internal server error",
            error : error,
        })
    }

}

const loginController = async(req,res) => {
    console.log("login");
   
    const{loginId,password} = req.body;

    if(!loginId || !password){
        return res.send({
            status : 400,
            message : "user credentials are missing",
        })
    }
    console.log(req.body);

    //find user with loginId
    try{
          const userDb = await User.findUserWithKey({key : loginId});
         // console.log(userDb);
          const isMatch = await bcrypt.compare(password,userDb.password);
          if(!isMatch){
            return res.send({
                status : 400,
                message : "password incorrect",
            })
          }

          //console.log(req.session);
          req.session.isAuth = true;
          req.session.user = {
            user_id : userDb.id,
            email : userDb.email,
            username : userDb.username,
          }

          //console.log(req.session.user);

          return res.send({
            status : 200,
            message : "login succcessfull",
            
        });
    }
    catch(error){
        //console.log("login error",error);
           return res.send({
            status : 500,
            message : "internal server error",
            error : error
           })
    }
    
}

const logoutController = async(req,res) => {
     //console.log("111",req.session);

     req.session.destroy((err)=>{
        if(err){
            return res.send({
                status : 500,
                message : "logout fail"
            })
        }

        return res.send({
            status : 200,
            message : "logout successfull"
        })
     })
     
}
module.exports = {registerController, loginController , logoutController};