#!/usr/bin/node

const http = require('http'),
      url=require('url'),
      qs=require('queryString'),
      log = console.log;
var islogin=false;
http.createServer((req,res)=>{
  log(`\n\n${req.method} ${req.url} ${req.httpVersion}`);
  log(req.headers);
  log();

  if(typeof req.headers.cookie !== 'undefined'){
    var data = req.headers.cookie.split(';');
    log(data);
  }
  res.statusCode=200;
  res.setHeader('Set-cookie',['name=wangding','max-age=2000','mobile=1233475773']);
  res.end('hello world');


  //req.url==='/login'
  //method===post
  //get username and password from request body
  //judge user is legal
  //if legal show home
  //not legal show login
  if(req.url=='./login' && req.method==='POST'){
    var user = '';
    req.on('data',(data)=>{
      return user +=data;
    });
    req.end('end',()=>{
      var usr=qs.parse(user);
      if(usr.username==='wangding'&&usr.password==='123'){
        islogin=true;
        res.setHeader('Set-cookie',`login=${islogin}`);
        showHome(req,res);
      }else{
        showLogin(req,res);
      }
    });
  }
  //req.url==='/logout'
  //method ===get
  //logout show login page
  if(req.url=='/logout'&&req.method==='GET'){
    islogin=false;
    res.setHeader('Set-cookie',`login=${islogin}`);
    showLogin(req.res);
    return ;
  }

  //req,url==='other'
  //judge have logined
  //islogin show home page
  //no logoin show login page
  
  if(typeof req.headers.cookie !== 'undefined'){
    var data = req.headers.cookie.split('=');
    islogin=data[1];
    if(islogin === 'true'){
      showHome(req,res);
    }else{
      showLogin(res.res);
    }
  }
  
}).listen(8080);

function showLogin(req,res){
  var html=
  res.end(html);
}

function ShowHome(req,res){
  var html=

  res.end(html);
}
