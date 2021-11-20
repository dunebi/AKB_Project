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
        console.log(Date.now())
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
  const voteselect = req.body.voteselecttype;
  const voterFileName = req.files[0].filename;
  const candidateFileName = req.files[1].filename;
  console.log(electionName +' ' + startDate + ' ' + endDate )
  console.log(summary)
  console.log(voterFileName)
  console.log(candidateFileName)


  const spawn = require('child_process').spawn;
  const result = spawn('python', ['electionPage.py', 1, electionName, startDate, endDate, summary, voteselect, voterFileName, candidateFileName]);
});

app.post("/manageVoter",upload.array(),(req,res) =>{

  const spawn = require('child_process').spawn;
  console.log(req.body.eid);
  const result = spawn('python', ['manageVoter.py', req.body.eid]);

  result.stdout.on('data', function(data) { console.log(data.toString()); });

  result.stderr.on('data', function(data) { console.log(data.toString()); });
  
});


app.get("/voterjson",function(req,res)
{
    console.log('arrive')
    res.sendFile('/home/mimsu1139/server/downloads/voter.json');
    console.log('complete')
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running...");
});


