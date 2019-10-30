#!/usr/bin/node

const http = require('http'),
      url =require('url'),
      {chapterList,userList} =require('./data'),
      qs=require('qs');
      fs = require('fs');

var chapterId;
http.createServer((req,res) => {
  
  var file=__dirname;
  if(req.url==='/login/') { 
    console.log(req.url);            
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
  else if(req.url==='/list/'){
   
    file+='/chapterList.html';
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
  else if(req.url==='/listmanager/'){
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
  else if(req.url==='/addChapter/'){
    
    file+='/addChapter.html';
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
  else if(url.parse(req.url).pathname==='/listen'){
    let ll=url.parse(req.url,true);
    let username=ll.query.username;
    let pwd=ll.query.pwd;
    if(username===userList[0].username&&pwd===userList[0].pwd){
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
    
  }
  else if(url.parse(req.url).pathname==='/detail'){
    file+='/chapter.html';
    let a=url.parse(req.url).query;
    chapterId=a.charAt(a.length-1)-1;
    
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
  else if(req.url==='/read/'){
    res.write(JSON.stringify(chapterList[chapterId]));
    res.end();

  }
  else if(req.url==='/data/'){
    res.write(JSON.stringify(chapterList));
    res.end();
  }
  else if(req.url==='/add'){
    var tc='';
    let obj={};
    let date=new Date().toLocaleDateString();
    
   
    req.addListener("data",(post)=>{
      tc+=post;
     
      let title=qs.parse(tc).title;
      let content=qs.parse(tc).content;
      obj.chapterId=chapterList.length+1;
      obj.chapterName=title;
      obj.chapterDes=title;
      obj.chapterContent=content;
      obj.author='admin';
      obj.publishTimer=date;
      obj.imgPath="images/1442539025939884-lp.jpg";
      obj.views=0;
      if(title!==''&&content!==''){
        chapterList.push(obj);

      }
      

    })
  }
  else if(req.url!=='/'){
    var arr=req.url.split('/');
    var str='';
   
    if(arr[1]!=='list'&&arr[1]!=='login'&&arr[1]!=='listmanager'){
     
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
    console.log(urls);
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
