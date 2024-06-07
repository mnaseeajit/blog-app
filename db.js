const mongoose = require('mongoose');
const clc = require("cli-color");

mongoose.connect('mongodb+srv://manseeajit63:123456M@cluster0.voiepbc.mongodb.net/')
.then(()=>{
    console.log("mongodb connected successfully");
})
.catch((error)=>{
      console.log(error);
})

