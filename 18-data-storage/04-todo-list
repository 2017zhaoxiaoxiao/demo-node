#!/usr/bin/node

const http = require('http'),
      url=require('url'),
      qs=require('querystring'),
      log = console.log;
var items=[];

http.createServer((req,res)=>{
  log(`${req.method}${req.url}HTTP/${req.httpVersion}`);
  log(req.headers);
  log();
  if(req.url==='/'){
    //200 ok
    res.writeHead(200,{'Content-Type':'text/html','Content-Length':Buffer.byteLength(getHTML,'utf8')});
    res.end(getHTML);
  }else{
    var it=qs.parse(url.parse(req.url).query);
    if(typeof it !=='undefined'){
      items.push(it);
    }
    
  }
  res.end(getHTML());
}).listen(8080);

function getHTML(){
  return ''
  +'<!DOCTYPE html>'
  +'<html>'
  +'<head>'
  +'<title>TODO LIST</title>'
  +'</head>'
  +'<body>'
  +'<h1>TODO List</h1>'
  +'<ul>'
  + items.map(function(item){
    return '<li>'+item+'</li>';
  }).join('\n')
  +'</ul>'
  +'<form method="get"> '
  +'<input type="text" name="items">'
  +'<input type="submit" value="提交">'
  +'</form>'
  +'</body>'
  + '</html>';
}
