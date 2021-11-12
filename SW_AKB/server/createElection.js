const express = require("express");
const path = require('path')
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const multer = require("multer");
//const upload = multer({ dest: "uploads/" });
const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/');
      },
      filename: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        cb(null, basename + "-" + Date.now() + extension);
      }
    }),
  });
const app = express();
app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/uploads", upload.array("excel[]"), (req, res) => {
   
  console.log(req.files);
  const electionName = req.body.electionName;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const summary = req.body.summary;
  console.log(electionName +' ' + startDate + ' ' + endDate )
  console.log(summary)
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running...");
});