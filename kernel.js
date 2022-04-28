/*
REACT96
*/

var react={
  shell:{},
  evt:{},
  util:{}
}
var highestZIndex=10;
react.main=async function(){
  try{
document.querySelector("#convga").style.display='none';
document.querySelector("#maingfx").style.display='block';
  }catch(err){null}
var $Body=document.querySelector("#maingfx");
if(!$Body){$Body=document.createElement('div');document.body.appendChild($Body);};
  $Body.classList.add('mgfx-main');
var $Desktop=document.createElement("section");
$Desktop.className='user-desktop';
$Body.appendChild($Desktop);
var $Taskbar=document.createElement("footer");
$Taskbar.className="user-taskbar";
$Taskbar.style.zIndex="1000000000000000000000000000000000000000000000000";
$Body.appendChild($Taskbar);
var $Tasks=document.createElement("div");
$Tasks.className='taskbar-tasks';
$Taskbar.appendChild($Tasks);
function __SysStyle(href){
var d=document.createElement('link');d.rel='stylesheet';d.href=href;document.head.appendChild(d);
}
  
function __SysStyleRaw(href){
var d=document.createElement('style');d.rel='stylesheet';d.innerText=href;document.head.appendChild(d);
}
  
__SysStyleRaw(`.window-dlg {
  background-color: white !important;
}


.user-desktop{background-color:blue;width:100vw;height:100vh;position:fixed;z-index:4;background-position:center;box-sizing:border-box;user-select:none;-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;overflow:hidden;outline:0;}

.user-taskbar{width:100%;position:fixed;bottom:0px;left:0px;height:25px;font-size:22px;background-color:grey;}
.taskbar-task{height:25px;font-size:100%;background-color:grey;border: 2px inset #bfbfbf;background:none;box-shadow:none!important;}
.react-window-bar.active{border: 2px outset #bfbfbf !important;}
.window-dlg{display:block !important;}
.window-dlg.minimized{display:none !important}
.window-dlg{
border: 1px solid black !important;
}

.window-dlg .titlebar{
background:blue;
color: white !important;
font-size: 16px !important;
}

.window-dlg:not(.active) .titlebar {
background-color: #b4b4b4;
}

.inactive-tb-button{pointer-events:none;opacity:0.5;}
`);
   
  

var $WindowContainer=/*document.createElement('div');
$WindowContainer.className="react-window-area";
$Body.appendChild($WindowContainer);*/$Desktop;

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
    windowClass:params.windowClass||"",
    controlBoxStyle:params.controlBoxStyle||"WS_CBX_MINMAXCLOSE",
  };
  this.maximizeInfo={y:'0px',x:'0px',w:'0px',h:'0px'};
  var $id=this.id="wnd_"+(w96.WindowSystem._WinId);
  w96.WindowSystem.windows.push(this);
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
  this.minimized=true;
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
  this.minimized=!this.minimized;
}
$Desktop.onclick=function(){w96.WindowSystem.deactivateAllWindows();};
ReactStandardWindow.prototype.registerWindow=function(){
  var w$=document.createElement('div');
  w$.window=this
  //var us=this;
  w$.onmousedown=function(e){e.cancelBubble=true;try{e.stopPropagation()}catch(x){null};this.window.active()}
  w$.onclick=function(e){e.cancelBubble=true;try{e.stopPropagation()}catch(x){null};}
  w$.style.height=this.params.initialHeight+'px';
  w$.style.width=this.params.initialWidth+'px';
  w$.className="window-dlg minimized";
  w$.id=this.id;
  var tb=document.createElement("div");
  tb.className="titlebar";
  var tbt=document.createElement("div");
  tbt.className='titlebar-title';
  tbt.innerText=this.params.title;
  tb.appendChild(tbt);
  var me=this;
  var tbc=document.createElement('div');
  tbc.className="titlebar-closebutton no-drag";
  tbc.onclick=function () {
    me.close();
  };
  tb.appendChild(tbc);
  var tbc=document.createElement('div');
  tbc.className="titlebar-maxbutton no-drag";
  tbc.onclick=function () {
    me.toggleMaximize();
  };
  tb.appendChild(tbc);
  var tbc=document.createElement('div');
  tbc.className="titlebar-minbutton no-drag";
  tbc.onclick=function () {
    me.toggleMinimize();
  };
  tb.appendChild(tbc);
  w$.appendChild(tb);
  var b$=document.createElement('div');
  b$.style.height="100%";
  b$.style.width="100%";
  b$.className="window-html no-drag";
  b$.innerHTML=this.params.body;
  w$.appendChild(b$);
  $WindowContainer.appendChild(w$);
  $('#'+w$.id).draggable({
    cancel:'.no-drag'
  });
  $('#'+w$.id).resizable({
    handles:'all'
  });
  this.wndObject=w$;
  setInterval(function(){if(me.maximzied){w$.style.height=(window.innerHeight-$Taskbar.offsetHeight)+"px"}},100);
  this.setControlBoxStyle(this.params.controlBoxStyle);
}
  
ReactStandardWindow.prototype.setControlBoxStyle=function(cbx){
  if(cbx=="WS_CBX_NONE"){
    this.wndObject.querySelector(".titlebar-maxbutton").style.display="none";
    this.wndObject.querySelector(".titlebar-minbutton").style.display="none";
    this.wndObject.querySelector(".titlebar-closebutton").style.display="none";
  } else if(cbx=="WS_CBX_CLOSE"){
    this.wndObject.querySelector(".titlebar-maxbutton").style.display="none";
    this.wndObject.querySelector(".titlebar-minbutton").style.display="none";
    this.wndObject.querySelector(".titlebar-closebutton").style.display="";
  } else if(cbx=="WS_CBX_MINCLOSE") {
    this.wndObject.querySelector(".titlebar-maxbutton").className="titlebar-maxbutton inactive-tb-button no-drag";
    this.wndObject.querySelector(".titlebar-minbutton").style.display="";
    this.wndObject.querySelector(".titlebar-closebutton").style.display="";
  } else {
    this.wndObject.querySelector(".titlebar-maxbutton").style.display="";
    this.wndObject.querySelector(".titlebar-maxbutton").className="titlebar-maxbutton no-drag"
    this.wndObject.querySelector(".titlebar-minbutton").style.display="";
    this.wndObject.querySelector(".titlebar-closebutton").style.display="";
  }
}

ReactStandardWindow.prototype.close=function () {
  try{
    for(var i=0;i<w96.WindowSystem.windows.length;i++){
      try{
      if(this.windows[i].id==this.id){
        w96.WindowSystem.windows[i]=null;
        break;
      }
      }catch(e){null}
    }
  }catch(er){null}
  this.wndObject.parentNode.removeChild(this.wndObject);
  try{
    w96.shell.Taskbar.destroyAppBar(this.id);
  }catch(e){null}
}

ReactStandardWindow.prototype.active=function () {
  w96.WindowSystem.deactivateAllWindows();
  this.wndObject.classList.add("active");
  this.wndObject.style.zIndex=highestZIndex;
  highestZIndex++;
  try{
    w96.shell.Taskbar.activateAppBar(this.id);
  } catch (e){null}
}
  
 ReactStandardWindow.prototype.registerAppBar=function(){
   if(this.appbarRegistered)return;
   this.appbarRegistered=true;
   w96.shell.Taskbar.createWindowAppBar(this);
 }

  ReactWindowSystem.prototype.findWindow=function(id){
    for(var i=0;i<this.windows.length;i++){
      try{
      if(this.windows[i].id==id){return this.windows[i]}
      }catch(e){null}
    }
  }

function ReactTaskbarShell(){0;}


ReactTaskbarShell.prototype.createWindowAppBar=function(e){
  var $id=e.id;
  var args=e.params;
  var $AppBar=document.createElement("div");
  $AppBar.className="taskbar-task react-window-bar";
  $AppBar.id=$id+"_appbar";
  var $ABIcon=document.createElement("img");
  $ABIcon.className="taskbar-task-icon";
  $ABIcon.style.display='none';
  $ABIcon.id='wnd_'+$id+'_appbar_icon';
  $AppBar.appendChild($ABIcon);
  var $ABTitle=document.createElement("span");
  $ABTitle.innerText=args.title;
  $ABTitle.className="taskbar-task-text";
  $ABTitle.id="wnd_"+$id+"_appbar_text";
  $AppBar.appendChild($ABTitle);
  $AppBar.associatedWindow=e;
  $AppBar.onclick=function(){this.associatedWindow.toggleMinimize()}
  document.querySelector(".taskbar-tasks").appendChild($AppBar);
}

ReactTaskbarShell.prototype.destroyAppBar=function(id) {
  try{
    var tbi=document.querySelector("#"+id+"_appbar");tbi.parentNode.removeChild(tbi);
  } catch (e){alert(e)}
}

ReactTaskbarShell.prototype.activateAppBar=function(id) {
  try{
    var tbi=document.querySelector("#"+id+"_appbar");tbi.className="taskbar-task react-window-bar active";
  }catch(e){null}
}

ReactTaskbarShell.prototype.deactivateAppBar=function(id) {
  try{
    var tbi=document.querySelector("#"+id+"_appbar");tbi.className="taskbar-task react-window-bar inactive";
  }catch(e){null}
}

  
ReactStandardWindow.prototype.toggleMaximize=function(){
  if(this.maximized){
    this.wndObject.style.top=this.maximizeInfo.y;
    this.wndObject.style.left=this.maximizeInfo.x;
    this.wndObject.style.height=this.maximizeInfo.h;
    this.wndObject.style.width=this.maximizeInfo.w;
  } else {
    this.maximizeInfo.y=this.wndObject.style.top;
    this.maximizeInfo.x=this.wndObject.style.left;
    this.maximizeInfo.w=this.wndObject.style.width;
    this.maximizeInfo.h=this.wndObject.style.height;
    this.wndObject.style.width="100%";
    this.wndObject.style.top="0px";
    this.wndObject.style.left="0px";
  }
  this.maximized=!this.maximized;
}
  
react.shell.Taskbar=new ReactTaskbarShell();
react.WindowSystem = new ReactWindowSystem();
react.StandardWindow=ReactStandardWindow;
  
setTimeout(function () {
  var sw=new ReactStandardWindow({
    title: `Welcome to React96`,
    body: `welcome to react96 i guess<br>
    i have no idea what i am doing<br>
    seriously go back to win96<br>
    <div className='react-welcome-switch'>
    <button class='rws-rkl'>remove kernel</button><br>
    <input class='rws-pti' value='W96FS'/><button class='rws-scp'>switch partition</button>
    </div>`,
    taskbar: true,
  });
  sw.show();
  var body=sw.wndObject;
  body.querySelector('.rws-scp').onclick=function(){
    localStorage.setItem('storeid',body.querySelector('.rws-scp').value);
    location.reload();
  }
  body.querySelector('.rws-rkl').onclick=function(){localStorage.removeItem('kernel-image');location.reload}
},1000);
  window.alert=function(e,o){prompt(o.title||"Alert",e);}
  window.onerror=function(err){alert(String(err),{title:"Exception",icon:'error'})}
}
window.w96=react;
