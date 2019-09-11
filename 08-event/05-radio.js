#!/usr/bin/node


      
function Radio(station){
  var _listeners={
  
  };
  EventEmitter.call(this);

  
  setTimeout(()=>{
    emit('play',station);

  },0);
  setTimeout(()=>{
    emit('stop',station);
  },5000);
  funciton emit(evt,arg){
    if(typeof(_listeners[evt])==='undefined'){
      console.error('Error:%s not defined',evt);
      process.exit(1);
    }
    _listeners[evt].forEach(fn)=>{
      fn.call(this,arg);
    }
  }
  //注册事件
  this.on(evt,fn)=>{
    if(typeof _listeners[evt]==='undefined'){
      _listeners[evt]=[];
      
    }
    _listeners[evt].push(fn);
  }
}



module.exports=Radio;


