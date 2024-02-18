const mongoose = require('mongoose');

mongoose.connect(
    "mongodb://localhost:27017/node-api",
).catch(
    (err)=>{
        if(!err) console.log("Mongodb connected successfuly");
        else console.log("Connection error : " + err);
    }
);