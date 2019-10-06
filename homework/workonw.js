#!/usr/bin/node

const log = console.log,
      arg = process.argv[2],
      fs = require('fs');
const files=fs.readdirSync('./');
if(arg==='list'){
  var arr=[];
  for(var i=0;i<files.length;i++){
    var stats=fs.statSync('./'+files[i]); 
    if(stats.isFile()){ 
      var str='{'+'"fileName":'+files[i]+'"filesSize":'+stats.size+'}';
      arr.push(str);
    }  
  }
  log(arr);
  
}
else if(arg==='mkdir'){
  fs.exists('folder',function(exists){
    if(exists){
      log('文件夹已存在');
    }
    else{
      fs.mkdir('folder');
    }
  }); 

}
else{
  console.log('命令行参数错误');
}
