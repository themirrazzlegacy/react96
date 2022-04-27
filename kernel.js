/*
REACT96
*/

var react={
  shell:{},
  evt:{},
  util:{}
}
react.main=async function(){
document.querySelector("#convga").style.display='none';
document.querySelector("#maingfx").style.display='block';
var $Body=document.querySelector("#maingfx");
var $Desktop=document.createElement("div");
$Desktop.className='user-desktop';
$Body.appendChild($Desktop);
var $Taskbar=document.createElement("div");
$Taskbar.className=".user-taskbar";
$Taskbar.style.zIndex="6";
$Body.appendChild($Taskbar);
function __SysStyle(href){
var d=document.createElement('link');d.rel='stylesheet';d.href=href;document.head.appendChild(d);
}
  
__SysStyle("ttps://raw.githubusercontent.com/themirrazz/react96/main/style.css");
   
  

var $WindowContainer=document.createElement('div');
$WindowContainer.className="react-window-area";
$Body.appendChild($WindowContainer);

function ReactWindowSystem() {
  this._WinId=0;
  this.windows=[];
  this.startZIndex=10;
  this.highestZIndex=10;
}


ReactWindowSystem.prototype.setWindowContainer=function(e){
  $WindowContainer=e;
}

ReactWindowSystem.prototype.getWindowContainer=function(){
  return $WindowContainer;
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

ReactWindowSystem.prototype.deactivateAllWindows=function() {
  try{
    for(var i=0;i<this.windows.length;i++) {
      try{
        this.windows[i].wndObject.classList.remove('active');
        try{
    w96.shell.Taskbar.deactivateAppBar(this.windows[i].id);
  } catch (e){null}
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
    title: String(params.title)||"Untitled Window",
    taskbar: params.taskbar||false,
    center: params.center||false,
    initialX:params.initialX,
    initialY:params.initialY,
    draggable:true,
    resizable: true,
    maximizable: true,
    minimizable: true,
    windowClass:params.windowClass||""
  };
  var $id=this.id=+"wnd_"+(w96.WindowSystem._WinId);
  w96.WindowSystem._WinId++;
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
  this.title=args.title;
  this.maximized=false;
  this.maximizable=true;
  this.minimizable=true;
  this.appbarRegistered=false;
  this.registerWindow();
  if(args.taskbar) {
    this.registerAppBar();
  }
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
  if(this.shown){return}
  this.shown=true
  this.maximized=false;
  this.toggleMinimize();
}

ReactStandardWindow.prototype.toggleMinimize=function () {
  if(this.minimized) {
    this.wndObject.classList.remove("minimized");
    this.active();
  } else {
    this.wndObject.classList.add("minimized");
    w96.WindowSystem.deactivateAllWindows();
  }
}

ReactWindow.prototype.registerWindow=function(){
  var w$=document.createElement('div');
  w$.style.height=this.params.initialHeight+'px';
  w$.style.width=this.params.initialWidth+'px';
  w$.className="window-dlg minimized";
  w$.id=this.id;
  $WindowContainer.appendChild(w$);
  $(w$).draggable({
    cancel:'.no-drag'
  });
  $(w$).resizable({
    handles:'all'
  });
  this.wndObject=w$;
}

ReactStandardWindow.prototype.close=function () {
  this.wndObject.parentNode.removeChild(this.wndObject);
  try{
    w96.shell.Taskbar.destroyAppBar(this.id);
  }catch(e){null}
}

ReactStandardWindow.prototype.active=function () {
  w96.WindowSystem.deactivateAllWindows();
  this.wndObject.classList.add("active");
  this.style.zIndex=w96.WindowSystem.highestZIndex;
  w96.WindowSystem.highestZIndex++;
  try{
    w96.shell.Taskbar.activateAppBar(this.windows[i].id);
  } catch (e){null}
}


function ReactTaskbarShell(){0;}


ReactTaskbarShell.prototype.createWindowAppBar=function(e){
  var $id=e.id;
  var args=e.params;
  var $AppBar=document.createElement("div");
  $AppBar.className="taskbar-task react-window-bar";
  $AppBar.id="wnd_"+$id+"_appbar";
  var $ABIcon=document.createElement("img");
  $ABIcon.className="taskbar-task-icon react-window-bar";
  $ABIcon.style.display='none';
  $ABIcon.id='wnd_'+$id+'_appbar_icon';
  $AppBar.appendChild($ABIcon);
  var $ABTitle=document.createElement("span");
  $ABTitle.innerText=args.title;
  $ABTitle.className="taskbar-task-text";
  $ABTitle.id="wnd_"+$id+"_appbar_text";
  $AppBar.appendChild($ABTitle);
  document.querySelector(".taskbar-tasks").appendChild($AppBar);
}

ReactTaskbarShell.prototype.destroyAppBar(id) {
  try{
    var tbi=document.querySelector("#"+id+"_appbar");tbi&&tbi.parentNode.removeChild(tbi);
  } catch (e){null}
}

ReactTaskbarShell.prototype.activateAppBar(id) {
  try{
    var tbi=document.querySelector("#"+id+"_appbar");tbi&&tbi.className="taskbar-task active";
  }catch(e){null}
}

ReactTaskbarShell.prototype.deactivateAppBar(id) {
  try{
    var tbi=document.querySelector("#"+id+"_appbar");tbi&&tbi.className="taskbar-task";
  }catch(e){null}
}

react.shell.Taskbar=new ReactTaskbarShell();
react.WindowSystem = new ReactWindowSystem();
react.StandardWindow=ReactStandardWindow;
}
