const userDataValidation = ({ name, email, username, password }) => {
    return new Promise((resolve, reject) => {
      if (!name || !email || !username || !password) reject("Missing user data");
  
      if (typeof name !== "string") reject("name is not a text");
      if (typeof username !== "string") reject("username is not a text");
      if (typeof password !== "string") reject("password is not a text");
      if (typeof email !== "string") reject("email is not a text");
  
      if (username.length < 3 || username.length > 50)
        reject("username length should be 3-50 chars");
      //if (!isEmailValidator({ str: email })) reject("Email format is incorrect");
  
      resolve();
    });
  };

  const blogValidation = ({title,textBody}) => {
    return new Promise((resolve,reject)=>{
       if(!title || !textBody){
          reject("Missing blog data");
       }
       if(typeof title !== "string") reject("title is not a text");
       if(typeof textBody !== "string") reject("blog is not a text");
       if(title.length < 3 || title.length > 100) reject("tile length between 3-100");

       resolve();
    })
  }

  module.exports = {userDataValidation, blogValidation};