let mongoose=require('mongoose')

let imgSchema= new mongoose.Schema({
    imgName: String,
  });

module.exports=mongoose.model('ImageCollections', imgSchema);