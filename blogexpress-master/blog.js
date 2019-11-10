#!/usr/bin/node

const express=require('express'),
      app=express(),
      url=require('url');
     
      fs = require('fs');

      app.use(express.static(__dirname));
var user,chapterList;


  
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
 
  app.get('/login',(req,res)=> { 
    
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
  });
  app.get('/data',(req,res)=>{
    res.write(JSON.stringify(chapterList));
    res.end();
  });
  app.get('/listen',(req,res)=>{
    let ll=url.parse(req.url,true);
    let username=ll.query.username;
    let pwd=ll.query.pwd;
    if(username===user.username&&pwd===user.password){
      file=__dirname+'/list.html';
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
      res.send('用户名或密码错误')
    }
    
  });
 
app.listen('8083');

