#!/usr/bin/node

const cp = require('child_process');
console.log('I am father with id:',process.pid);

var child = cp.fork('./02-child.js', ['04-fork.js']);

//child.stdout.pipe(process.stdout);
cp.fork('./02-child.js');

global .setTimeout(function(){
  child.send('hello i am your father');
},2000);


