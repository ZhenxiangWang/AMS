/*
Handle file upload routing
 */
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const dirPath = path.join(__dirname, "..", "public/upload");

const storage = multer.diskStorage({
  // destination: 'upload', //when string, service startup will automatically create folders
  destination: function(req, file, cb) {
    //Function needs to create folder manually
    // console.log('destination()', file)
    if (!fs.existsSync(dirPath)) {
      fs.mkdir(dirPath, function(err) {
        if (err) {
          console.log(err);
        } else {
          cb(null, dirPath);
        }
      });
    } else {
      cb(null, dirPath);
    }
  },
  filename: function(req, file, cb) {
    // console.log('filename()', file)
    var ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  }
});
const upload = multer({ storage });
const uploadSingle = upload.single("image");

module.exports = function fileUpload(router) {
  // upload image
  router.post("/manage/img/upload", (req, res) => {
    uploadSingle(req, res, function(err) {
      //Error handling
      if (err) {
        return res.send({
          status: 1,
          msg: "File upload failed"
        });
      }
      var file = req.file;
      res.send({
        status: 0,
        data: {
          name: file.filename,
          url: "http://localhost:5000/upload/" + file.filename
        }
      });
    });
  });

  // delete image
  router.post("/manage/img/delete", (req, res) => {
    const { name } = req.body;
    fs.unlink(path.join(dirPath, name), err => {
      if (err) {
        console.log(err);
        res.send({
          status: 1,
          msg: "Delete image filed"
        });
      } else {
        res.send({
          status: 0
        });
      }
    });
  });
};
