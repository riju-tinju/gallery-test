let mongoose=require('mongoose')

let heroHeadingSchema= new mongoose.Schema({
    heading1: String,
    heading2:String
  });

module.exports=mongoose.model('HeroHeadings', heroHeadingSchema);