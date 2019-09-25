#!/usr/bin/node
//初始化方法
var buf1=new Buffer(256);
buf1[0]=0;
const log=console.log;

log('buf1.length:',buf1.length);
log('buf1',buf1);

//循环初始化buffer中每个字节
for(var i=0;i<buf1.length;i++) buf1[i]=i;
log('buf1',buf1);

var buf2=
buf1.fill(0,0,256);
log('buf1:',buf1);
//
//对buffer做切片操作
buf2=buf1.slice(250,256);
log('buf2',buf2);
//在 buffer 中填充数据，buffer 数据转化成 JSON 数据
buf2.fill(0);
log('buf2',buf2.toJSON());
log('buf2',JSON.stringify(buf2));
//数组
var arr=['a',0xba,0xdf,0x00,255,10];
var buf3=new Buffer(arr);
log('buf3',buf3);

//字符串
var buf4=new Buffer('hello world!');
log('buf4',buf4);
//buffer数据复制
buf4.copy(buf3,0,0,buf3.length);
log('buf3',buf3);
//utf8编码
var str='你好 wangding';
var buf5=new Buffer(str,'utf8');
log('\nbuffer length:',buf5.length);
log('buf5 length',str.length);
log('string length',str.length); 
