const { reject } = require("promise");
let heroModel = require("../dataBase/models/heroModel");
let imgModel = require("../dataBase/models/imgModel");
const { ObjectId } = require('mongoose').Types;

// const newUser = new User({
//     name: 'John',
//     age: 30,
//     email: 'john@example.com'
//   });

module.exports = {

  editData: (reqBody) => {
    return new Promise(async (resolve, reject) => {
      const isHero = await heroModel.find().exec();
      if (isHero[0]) {
        //
        let result =await heroModel.updateOne(
            { "_id":isHero[0]._id },
            { $set: { "heading1": reqBody.heading1,"heading2": reqBody.heading2 } }
         )
         if (result.modifiedCount > 0) {
            console.log("Update operation worked!");
         } else {
            console.log("No documents were updated.");
         }
        //
        resolve();
      } else {
        let newHero = await new heroModel({
          heading1: reqBody.heading1,
          heading2: reqBody.heading2,
        });
        let add = await newHero
          .save()
          .then(() => {
            console.log("User saved successfully!");
          })
          .catch((err) => {
            console.error(err);
          });

          resolve()
      }
    });
  },
  getHero:()=>{
    return new Promise(async(resolve,reject)=>{
     const isHero = await heroModel.find().exec();
     resolve(isHero[0]) 
    })
  },
  addImg:(img)=>{
    return new Promise(async(resolve,reject)=>{
     let j=new imgModel({imgName:img})
     const saveImg = await j.save()
     resolve()
    })
  },

  getImg:()=>{
    return new Promise(async(resolve,reject)=>{
     const imgs = await imgModel.find().exec();
     resolve(imgs)
    })
  },

  delImg:(imgId)=>{
    return new Promise(async(resolve,reject)=>{
     const imgs = await imgModel.findByIdAndDelete(imgId);
     resolve(imgs)
    })
  }
};
