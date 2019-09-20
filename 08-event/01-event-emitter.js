#!/usr/bin/node

const EventEmitter=require('events'). EventEmitter;
var e=new EventEmitter();

global.setInterval(function(){  
  e.emit('hello');
},1000);
global.setTimeout(function(){
  e.emit('bye');
},5000);

e.on('hello',function(){
  console.log('hello event emit');
});
e.on('bye',function(){
  console.log('bye event emit');
  process.exit();
});

