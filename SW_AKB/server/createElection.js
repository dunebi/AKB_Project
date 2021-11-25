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
  const mid = req.body.mid;
  const electionName = req.body.electionName;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const summary = req.body.summary;
  //const voteselect = req.body.voteselecttype;
  const voterFileName = req.files[0].filename;
  const candidateFileName = req.files[1].filename;
  console.log(electionName +' ' + startDate + ' ' + endDate )
  console.log(summary)
  console.log(voterFileName)
  console.log(candidateFileName)


  const spawn = require('child_process').spawn;
  const result = spawn('python', ['/root/swe/python/electionPage.py', mid, electionName, startDate, endDate, summary, voterFileName, candidateFileName]);
});

app.post("/manageVoter",upload.array(),(req,res) =>{

  const spawn = require('child_process').spawn;
  console.log(req.body.eid);
  const result = spawn('python', ['/root/swe/python/manageVoter.py', req.body.eid]);

  result.stdout.on('data', function(data) { console.log(data.toString()); });

  result.stderr.on('data', function(data) { console.log(data.toString()); });
  
});


app.get("/voterjson",function(req,res)
{
    console.log('arrive')

    //server 용
    res.sendFile('/root/swe/server/downloads/voter.json');

    //localhost 용 : json이 생성되는 파일의 절대경로설정
    //res.sendFile('C:/Users/songm/AKB_Project/SW_AKB/server/downloads/voter.json')
    console.log('complete')
});

app.post("/managemain",function(req,res)
{
    //console.log("good")
    const spawn = require('child_process').spawn;
    console.log(req.body.mid);
    const result = spawn('python', ['/root/swe/python/managemain.py', req.body.mid]);

    result.stdout.on('data', function(data) { console.log(data.toString()); });
    result.stderr.on('data', function(data) { console.log(data.toString()); });
    
});

app.get("/electionjson",function(req,res)
{
    console.log('arrive')
    //server 용
    res.sendFile('/root/swe/server/downloads/election.json')

    //localhost 용 : json이 생성되는 파일의 절대경로설정
    //res.sendFile('C:/Users/songm/AKB_Project/SW_AKB/server/downloads/election.json');
    console.log('complete')
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running...");
});


