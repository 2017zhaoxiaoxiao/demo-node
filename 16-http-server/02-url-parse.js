#!/usr/bin/node

const http = require('http'),
      log = console.log,
      url = require('url'),
      qs = require('querystring');

http.createServer((req,res)=>{
  log('request URL:',req.url);

  //var addr =url.parse(req.url);
  var addr = url.parse('https://wangding:1234@www.baidu.com:8000/a/b/c?age=20&color=green#/def/efg');
  log('protocol',addr.protocol);
  log('username',addr.username);
  log('password',addr.password);
  log('auth',addr.auth);
  log('host',addr.host);
  log('port',addr.port);
  log('hsah',addr.hash);
  log('path-name',addr.pathname);
  log('query parse',addr.pathname.split('./'));
  log('query string',addr.query);
  log('qs parse',qs.parse(addr.query));
}).listen(8080);

