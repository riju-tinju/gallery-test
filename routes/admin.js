var express = require("express");
var router = express.Router();
let adminHelper = require("../functions/adminHelper");
const fs = require("fs");
let admin = false;
let adminLogin;

let verifyAdmin = (req, res, next) => {
  if (req.session.admin && req.session.admin.loggedIn == true) {
    admin = true;
    next();
  } else {
    admin = false;
    res.redirect("/admin/admin-login");
  }
};

/* GET users listing. */
router.get("/", verifyAdmin, async function (req, res, next) {
  let hero = await adminHelper.getHero();
  let imgs = await adminHelper.getImg();
  res.render("admin/editHero", { admin, hero, imgs });
});
router.post("/edit-hero",verifyAdmin, async (req, res) => {
  let editHero = await adminHelper.editData(req.body);
  res.redirect("/admin");
});
// router.post("/add-img",verifyAdmin, async (req, res) => {
//   const file = req.files.image;

//   // Use the mv() method to save the file to the server.
//   file.mv("public/images/" + req.body.imgName + ".jpg", async function (err) {
//     if (err) {
//       return res.status(500).send(err);
//     } else {
//       let imgSave = await adminHelper.addImg(req.body.imgName);
//       router.get('/')
//     }
//     res.redirect("/admin");
//   });
// });
router.post("/add-img", verifyAdmin, async (req, res) => {
  const file = req.files.image;

  // Use the mv() method to save the file to the server.
  file.mv("public/images/" + req.body.imgName + ".jpg", async function (err) {
    if (err) {
      return res.status(500).send(err);
    } else {
      let imgSave = await adminHelper.addImg(req.body.imgName);
      res.redirect("/admin"); // Corrected placement of res.redirect
    }
  });
});



router.get("/delete/:id/:name",verifyAdmin, async function (req, res, next) {
  let delImg = await adminHelper.delImg(req.params.id);
  if (delImg) {
    let imagePath = "public/images/" + req.params.name + ".jpg";
    await fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Image deleted successfully!");
    });
  }
  res.redirect("/admin");
});

router.get("/admin-login", (req, res) => {
  res.render("admin/admin-login", { admin });
});

router.get("/logout",verifyAdmin, (req, res) => {
  req.session.destroy()
  res.redirect("/")
});

router.post("/admin-login", async (req, res) => {
  let { adminName, adminPassword } = req.body;
  try {
    if (
      process.env.ADMIN_NAME == adminName &&
      process.env.ADMIN_PASSWORD == adminPassword
    ) {
      console.log("logged succes");
      req.session.admin = { loggedIn: true };
     // res.send("success")
      res.redirect("/admin")
    } else {
      console.log("logged faild..");
      //res.send("failed..")
      res.redirect("/admin/admin-login")
    }
  } catch (err) {
    console.log("err occured");
  }
});
module.exports = router;
