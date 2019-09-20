#!/usr/bin/node

const http = require('http');

const server=http.createServer();
http.createServer((req,res)=>{
    res.end('hello world');
}).listen(8080);

