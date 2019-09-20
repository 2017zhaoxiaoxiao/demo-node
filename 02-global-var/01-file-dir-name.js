#!/usr/bin/node

console.log('dir name:',__dirname);
console.log('file name:',__filename);

const path=require('path');
fileName=path.join(__dirname,'view','login.html');
console.log('fileName:',fileName);

//opterate data file

/*var file=__dirname + '/data/db.xml';
console.log('file name:',file);

file=__dirname+'\\data\\db.xml';
console.log('file name in windows:',file);


const path=require('path');

file=path.join(__dirname,'data','db.xml');
console.log(file);*/




