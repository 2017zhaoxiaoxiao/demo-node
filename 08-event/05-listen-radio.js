#!/usr/bin/node

const Radio=require('./03-radio.js');
const station={
  freq:'106.7',
  name:'music radio'
};

var radio=new Radio(station);
radio.on('play',(station)=>{
  console.log('"%s" FM %s opened!',station.name,station.freq);
  console. log('lalalal');
});

radio.on('stop',(station)=>{
  console.log('"%s" FM %s closed!',station.name,station.freq);
});




