#!/usr/bin/node

const http = require('http'),
      url =require('url'),
   
      qs=require('qs');
      fs = require('fs');


var user,chapterList;

http.createServer((req,res) => {
  
  var file=__dirname;
  fs.readFile(file+'/data.json',function(err,data){
    if(err){
        return console.error(err);
    }
    var person = data.toString();//将二进制的数据转换为字符串
    person = JSON.parse(person);//将字符串转换为json对象
    user=person.users[0];
    chapterList=person.chapterList;
    
  })         
 
  if(req.url==='/login') { 
    
    file+='/login.html'; 
    res.writeHead(200,{'Content-Type':'text/html'});
    fs.readFile(file,'utf-8',(err,data)=>{
      if(err){
        console.log(err);
      }
      else{
        res.end(data);
      }
    });  
  }
  else if(req.url==='/data'){
    res.write(JSON.stringify(chapterList));
    res.end();
  }
  else if(url.parse(req.url).pathname==='/listen'){
    let ll=url.parse(req.url,true);
    let username=ll.query.username;
    let pwd=ll.query.pwd;
    if(username===user.username&&pwd===user.password){
      file+='/list.html';
      res.writeHead(200,{'Content-Type':'text/html'});
      fs.readFile(file,'utf-8',(err,data)=>{
        if(err){
          console.log(err);
        }
        else{
          res.end(data);
        }
      });  
  
      
    }
    else{
      showErr(res);
    }
    
  }
  else if(req.url!=='/'){
    var arr=req.url.split('/');
    var str='';
   
    if(arr[1]!=='list'){
     
      str=req.url;
    }
    else{
      str='/';
      for(var i=2;i<arr.length;i++){
        str+=arr[i]+'/';
      
      }
      str=str.substring(0,str.length-1);
      
    }
    var urls ='.'+str;
   
    res.writeHead(200,{'Content-type':"text/css"});
    fs.readFile(urls,(err, data)=> {
        if(err) {
            console.log(err);
        }else{
            res.end(data);
        }
    });
  }
 
 
}).listen(8083);
function showErr(res){
  var html=`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>状态保持</title></head><body><h1>密码或用户名输入错误</h1></body></html>`;
  
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.statusCode = 200;
  res.end(html);
}
