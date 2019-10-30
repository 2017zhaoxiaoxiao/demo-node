#!/usr/bin/node

const http = require('http'),
      url=require('url'),
      fs=require('fs'),
      log = console.log;
var item=[];

http.createServer((req,res)=>{
  log(`${req.method}${req.url}HTTP/${req.httpVersion}`);
  log(req.headers);
  log();

  var items=['eats'];

  if(req.method==='GET'&&req.url=='/'){
    //200 ok
    res.writeHead(200,{'Content-Type':'text/html','Content-Length':Buffer.byteLength(getHTML,'utf8')});
    res.end(getHTML);
  }else if(req.method==='POST'&&req.url=='/'){
    var it='';
    req.on('data',(data)=>{
      it+=data;
    });
    req.on('end',()=>{ 
      if(typeof it !=='undefined'){
        items.push(qs.parse(it).item);
      }  
      res.end(getHTML());
    }); 
  }
  else{
    res.end('error');
  }

}).listen(8080);
//
function getHTML(){
  var html =fs.readFileSync('todo.html').toString('utf8');
  html=html.replace("%",item.map(function(item){return '<li>'+item+'</li>';}).join('\n'));
  return html;
}
