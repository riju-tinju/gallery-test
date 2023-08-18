var express = require('express');
var router = express.Router();
var hbs = require("hbs");
let userHelper=require('../functions/userHelper')


/* GET home page. */
router.get('/', async function(req, res, next) {
  let hero=await userHelper.getHero()
  let imgs=await userHelper.getImg()
  res.render('index', { admin:false,hero,imgs });
});




module.exports = router;
