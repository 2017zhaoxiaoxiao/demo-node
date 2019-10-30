#!/usr/bin/node

const http = require('http'),
      log = console.log;

http.createServer((req,res)=>{
  log(`\n\n ${req.method} ${req.url} ${req.httpVersion}`);
  log(req.headers);
  log();
  switch(req.url){
    case '/admin':
      var auth=req.headers.authorization;
      if(typeof auth !=='undefined'){
       
        var usr=getUserNamePwd(auth);
        if(usr.username==='wangding' && usr.password==='123'){
          showSecret(req,res);
        }else{
          showNormal(res);
        }
      }else{
        res.statusCode=401;
        res.setHeader('www-authenticate','basic');
        showNormal(res);
      }
      break;
    default:
      showNormal(res);
      break;
  }
 
 
}).listen(8080);
function showNormal(res){
  
}


function showSecret(req,res){
  res.end('hello');
}


function getUserNamePwd(auth){
  log('authorization',auth);
  var au = auth.split(' ');
  if(au[0]==='Basic'){
    var buf =new Buffer(au[1],'base64');
    var usr =buf.toString('utf8').split(':');
    log('username',usr[0]);
    log('password',usr[1]);
  }
  
  return {
    username:usr[0],
    password:usr[1]
  };
}

