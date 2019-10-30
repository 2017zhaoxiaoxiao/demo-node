#!/usr/bin/node

const http = require('http'),
      fs=require('fs');
      log =console.log;
//载入数据
var items=loadData();
http.createServer((req,res)=>{
  log(`${req.method}${req.url} HTTP/${req.httpVersion}`);
  log(req.headers);
  log('');
 
  switch(req.method){
    case 'GET':
      select(req,res);
      break;
    case 'POST':
      inset(req,res);
      break;
    case 'PUT':
      update(req,res);
      break;
    case 'DELETE':
      remove(req,res);
      break;
    default:
      err(res);
  }
  res.end('OK');
}).listen(8080);

function select(req,res){
  var data=JSON.stringify(items);
  res.setHeader('Content-Length',Buffer.byteLength(data));
  res.setHeader('Access-Control-Allow-Orign','*');
  res.end(data);
}
function inset(req,res){
  var item='';
  req.on('data',(data)=>{
    item+=data;
  });
  req.on('end',()=>{
    if(typeof item !== 'undefined'){
      
      items.push(item);

      res.end('Insert OK!');
    }else{
      res.end('Insert Error');
    }
  });
  res.end(res.method);
}

function update(req,res){
  //parse url get id ,validate id ,type and range
  //
  //parse req get content,validate content 
  //
  //modify items, items[id] =new comtent
  var arg = req.url.split('/');
  if(arg[1] === '') {
    items = [];
         
  }

  var item = '';
  res.setHeader('Access-Control-Allow-Origin', '*');
  req.on('data', (chunk) => { item += chunk;  });
  req.on('end', () => {
    var i = parseInt(arg[1]);

    if(!items[i]) {
      res.statusCode = 404;
      res.end('Not found');
                               
    } else {
      items[i] = item;
      res.statusCode = 200;
      res.end('update OK');
                                     
    }
               
  });
}

function remove(req,res)
{
  var id=req.url.slice(1,req.url.length);
  //validate id:1. type 2. range
  //del item[id]
  items.splice(id,1);
  res.end('Delete OK');
  
}
function err(res){
  res.end(res.method);
}


function loadData(){
  try{
    var data =fs.readFileSync('./todo-list/.txt','utf8');
    return JSON.parse(data);
  }catch(e){return[];}
}

process.on('SIGINT',()=>{
  fs.writeFileSync('./todo-list.txt',JSON.stringify(items));
  process.exit();
});
