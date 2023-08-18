const { reject } = require("promise");
let heroModel = require("../dataBase/models/heroModel");
const { ObjectId } = require('mongoose').Types;
let imgModel = require("../dataBase/models/imgModel");

module.exports = {

  getHero:()=>{
    return new Promise(async(resolve,reject)=>{
     const isHero = await heroModel.find().exec();
     resolve(isHero[0]) 
    })
  },
  getImg:()=>{
    return new Promise(async(resolve,reject)=>{
     const imgs = await imgModel.find().exec();
     resolve(imgs)
    })
  }
};
