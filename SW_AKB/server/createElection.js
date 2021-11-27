const express = require("express");
const path = require('path')
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const multer = require("multer");


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

app.post("/insertContract",upload.array(),(req,res) =>{

  const spawn = require('child_process').spawn;
  console.log(req.body.eid)
  console.log(req.body.adminAddr);
  console.log(req.body.contractAddr);
  const result = spawn('python', ['/root/swe/python/insertContract.py',req.body.eid ,req.body.adminAddr, req.body.contractAddr]);

  //result.stdout.on('data', function(data) { console.log(data.toString()); });

  //result.stderr.on('data', function(data) { console.log(data.toString()); });
  result.on('close', function(code) {res.end();});
  
});

app.get("/get_voteCandidatejson",function(req,res)
{
   

    //server 용
    res.sendFile('/root/swe/server/downloads/voteCandidate.json');

    //localhost 용 : json이 생성되는 파일의 절대경로설정
    //res.sendFile('C:/Users/songm/AKB_Project/SW_AKB/server/downloads/voter.json')
   
});
app.get("/get_address",function(req,res)
{
   

    //server 용
    res.sendFile('/root/swe/server/downloads/address.json');

    //localhost 용 : json이 생성되는 파일의 절대경로설정
    //res.sendFile('C:/Users/songm/AKB_Project/SW_AKB/server/downloads/voter.json')
   
});
app.post("/makejson_voteCandidate",upload.array(),(req,res) =>{

  const spawn = require('child_process').spawn;
  console.log(req.body.eid);
  const result = spawn('python', ['/root/swe/python/makejson_voteCandidate.py', req.body.eid]);

  result.stdout.on('data', function(data) { console.log(data.toString()); });

  //result.stderr.on('data', function(data) { console.log(data.toString()); });
  result.on('close', function(code) {res.end();});
  
});
app.post("/insertContract",upload.array(),(req,res) =>{

  const spawn = require('child_process').spawn;
  console.log(req.body.eid)
  console.log(req.body.adminAddr);
  console.log(req.body.contractAddr);
  const result = spawn('python', ['/root/swe/python/insertContract.py',req.body.eid ,req.body.adminAddr, req.body.contractAddr]);

  //result.stdout.on('data', function(data) { console.log(data.toString()); });

  //result.stderr.on('data', function(data) { console.log(data.toString()); });
  result.on('close', function(code) {res.end();});
  
});
app.post("/getElectionInfo",upload.array(),(req,res) =>{

  const spawn = require('child_process').spawn;
  console.log(req.body.eid);
  const result = spawn('python', ['/root/swe/python/getelectioninfo.py', req.body.eid]);

  result.stdout.on('data', function(data) { console.log(data.toString()); });

  //result.stderr.on('data', function(data) { console.log(data.toString()); });
  result.on('close', function(code) {res.end();});
  
});

app.get("/electioninfojson",function(req,res)
{
   

    //server 용
    res.sendFile('/root/swe/server/downloads/election_info_block.json');

    //localhost 용 : json이 생성되는 파일의 절대경로설정
    //res.sendFile('C:/Users/songm/AKB_Project/SW_AKB/server/downloads/voter.json')
   
});

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

  result.stdout.on('data', function(data) { console.log(data.toString()); });
  result.on('close', function(code) {res.end();});
});

app.post("/manageVoter",upload.array(),(req,res) =>{

  const spawn = require('child_process').spawn;
  console.log(req.body.eid);
  const result = spawn('python', ['/root/swe/python/manageVoter.py', req.body.eid]);

  result.stdout.on('data', function(data) { console.log(data.toString()); });

  //result.stderr.on('data', function(data) { console.log(data.toString()); });
  result.on('close', function(code) {res.end();});
  
});

app.post("/modifyVoter",upload.array(),(req,res) =>{

  const spawn = require('child_process').spawn;
  console.log(req.body.remove);
  console.log(req.body.insert);
  
  /*result.on('close', (code) => {
    res.end();
  });*/
  
});

app.post("/userlogin",upload.array(),(req,res) =>{

  const spawn = require('child_process').spawn;
  console.log(req.body.realnumber);
  console.log(req.body.name);
  const result = spawn('python', ['/root/swe/python/userLogin.py', req.body.name,req.body.realnumber]);

  result.stdout.on('data', function(data) { 
    console.log(data.toString());
    global.uid = data.toString(); });
  console.log(global.uid);
  result.on('close', (code) => {
    res.end();
  });
  


  
});

app.get("/userloginget",function(req,res)
{
    console.log('arrive')

    //server 용
    //res.sendFile('/root/swe/server/downloads/userlogin.json');
    res.send(global.uid)
    //localhost 용 : json이 생성되는 파일의 절대경로설정
    //res.sendFile('C:/Users/songm/AKB_Project/SW_AKB/server/downloads/voter.json')
    console.log('complete')
});

app.post("/usermain", upload.array(), function(req,res){
  const spawn = require('child_process').spawn;
  const result = spawn('python', ['/root/swe/python/usermain.py', req.body.uid]);
  result.stdout.on('data', function(data) {console.log(data.toString()); });
  result.on('close', function(code) {res.end()})
})

app.get("/uelectionjson", (req,res) => {
  res.sendFile('/root/swe/server/downloads/uelection.json');
})

app.get("/voterjson",function(req,res)
{
    console.log('arrive')

    //server 용
    res.sendFile('/root/swe/server/downloads/voter.json');

    //localhost 용 : json이 생성되는 파일의 절대경로설정
    //res.sendFile('C:/Users/songm/AKB_Project/SW_AKB/server/downloads/voter.json')
    console.log('complete')
});

app.post("/managemain",upload.array(),function(req,res)
{
    //console.log("good")
    const spawn = require('child_process').spawn;
    console.log(req.body.mid);
    const result = spawn('python', ['/root/swe/python/managemain.py', req.body.mid]);

    result.stdout.on('data', function(data) { console.log(data.toString()); });
    //result.stderr.on('data', function(data) { console.log(data.toString()); });
    result.on('close', function(code) {res.end();})
    
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

app.post("/managelogin",upload.array(),(req,res) =>{

  const spawn = require('child_process').spawn;
  console.log(req.body.m_id)
  console.log(req.body.m_password)
  const result = spawn('python', ['/root/swe/python/managelogin.py', req.body.m_id, req.body.m_password]);

  result.stdout.on('data', function(data) {
      MID = data.toString();
      console.log("python executed")
  });
  result.on("close", function(code) {
      console.log("python ended")
      res.end();
  });
});

app.get("/loginresult",function(req,res)
{
  console.log("Sending ...");
  res.send(MID);
  console.log(MID);
  console.log("Sending Complete");
});

var check1;
app.post("/usercheck", upload.array(), (res,req) => {
    const spawn = require('child_process').spawn;
    const result = spawn('python', ['/root/swe/python/logincheck.py', res.body.id]);

    result.stdout.on('data', function(data) {
        check1 = data.toString(); 
        console.log(check1); 
    });
    //result.stderr.on('data', function(data) { console.log(data.toString()); });
    result.on('close', function(code) {req.end()});
});

app.get("/checkresult", function(res,req) {
    //console.log("Sending...")
    req.send(check1)
});

var check2;
app.post("/signup", upload.array(), (res,req) => {
    const spawn = require('child_process').spawn;
    const result = spawn('python', ['/root/swe/python/signup.py', res.body.id, res.body.password, res.body.phonenum]);

    result.stdout.on('data', function(data){
        check2 = data.toString();
        console.log(check2);
    });
    result.on('close', function(code) {req.end()});
})

app.get("/signupresult", function(res,req){
    console.log("Sending..")
    req.send(check2)
});

app.post("/delete", upload.array(), (res, req) => {
  const spawn = require('child_process').spawn;
  const result = spawn('python', ['/root/swe/python/delete.py', res.body.eid]);

  result.stdout.on('data', function(data){console.log(data.toString())});
  result.on('close', function(close) {req.end()})
});

app.get("/deleteresult", function(res,req){
  console.log("Sending");
  req.send("/");
});

app.post("/getelectiondata", upload.array(), (res,req) => {
  const spawn = require('child_process').spawn;
  const result = spawn('python', ['/root/swe/python/getelectiondata.py', res.body.eid]);

  result.stdout.on('data', function(data) {console.log(data.toString())})
  result.on('close', function(close) {req.end()})
})

app.get("/electiondatajson", (res,req) => {
  req.sendFile('/root/swe/server/downloads/electiondata.json')
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running...");
});


