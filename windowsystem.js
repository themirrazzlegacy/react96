/*
React96 WindowSystem
*/

function ReactWindowSystem() {
  this._WinId=0;
  this.windows=[];
}

ReactWindowSystem.prototype.closeAllWindows=function() {
  try{
    for(var i=0;i<this.windows.length;i++) {
      try{
        this.windows[i].close()
      }catch(err){null}
    }
  }catch(e){null}
}

ReactWindowSystem.prototype.minimizeAllWindows=function() {
  try{
    for(var i=0;i<this.windows.length;i++) {
      try{
        if(!this.windows[i].minimized){
        this.windows[i].toggleMinimize()
        }
      }catch(err){null}
    }
  }catch(e){null}
}


function ReactStandardWindow(params){
  params=params||{};
  var args={
    body: params.body||"",
    initialHeight:params.initalWidth||400,
    initialWidth:params.initalWidth||480,
    title: params.title||"Untitled Window",
    taskbar: params.taskbar||false,
    center: params.center||false,
    initialX:params.initialX,
    initialY:params.initialY,
    draggable:true,
    resizable: true,
    maximizable: true,
    minimizable: true,
  };
  if(params.center) {
    params.initialX=(window.innerWidth-params.initialWidth)/2;
    params.initialY=(window.innerHeight-params.initialHeight)/2;
  }
  if(!params.initialX) {
    params.initialX=Math.floor(Math.random()*(window.innerWidth-params.initialWidth))
  }
  if(!params.initialY) {
    params.initialY=Math.floor(Math.random()*(window.innerHeight-params.initialHeight))
  }
  this.params=args;
  this.shown=false;
  this.maximized=false;
  this.draggable=false;
  this.maximizable=true;
  this.minimizable=true;
  var selfBounds={
    x:params.initialX,
    y:params.initialY,
    height:params.intialHeight,
    width:params.initialWidth
  };
  selfBounds.top=selfBounds.x
  selfBounds.left=selfBounds.y
}

ReactStandardWindow.prototype.show=function () {
  this.shown=true
  this.maximized=false;
  this.draggable=params.draggable;
  this.minimized=false;
  if(this.params.taskbar) {
    this.registerAppBar()
  }
}
