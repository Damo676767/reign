var socket;

let mcard = [];
let chosen_card;

let gameinprog = false;

let mode ="menu";

let screenobs = [];

let gamecode = 0;




function preload(){
  var mcarddata = getmcarddata();
  for (i=0;i<mcarddata.length;i++){
    for (j=0;j<mcarddata[i].multiplicity;j++){
      mcard.push(new MilCard(mcarddata[i]));
    }
  }
  socket = io.connect();
  socket.on('gamestarted',gameStarted);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setmainmenu();
}

function draw() {
  background(255);
  for (let i=0; i<screenobs.length; i++){
    screenobs[i].disp();
  }
}

function mouseClicked(){
  var selected = -1;
  for (let i=0; i<screenobs.length; i++){
    if (screenobs[i].clicked(mouseX,mouseY)){
      selected = i;
    }
  }
  if (selected >=0){
    screenobs[selected].clickfunc();
  }
}


function clickedstartgame(){
  mode = "host";
  var tosend = {
    x: mouseX,
    text:"Some text"
  };
  socket.emit('startgame',tosend);
}

function clickedjoingame(){
  mode = "join";
  clearscreen();
  var screenob;  
  var h=height/13;
  var w=width/20;
  for (let i=0;i<3;i++){
    for (let j=0;j<3;j++){
      var x=1+j+3*i;
      addnumbut(x,w+3*w*j,height-3*h*(i+2),2*w,2*h);
    }
  }
  addnumbut(0,w,height-3*h,2*w,2*h);
  screenob = new ScreenObject("clear",4*w,height-3*h,5*w,2*h,true);
  screenob.clickfunc = function() {gamecode=0;}
  screenobs.push(screenob);
  screenob = new ScreenObject("",width*0.6,height*0.2,width*0.3,height*0.4,false);
  screenob.grabtext = function() {
    if(gamecode==0){
      this.text = "";
    }else{    
      this.text=gamecode.toString()
    }
  }
  screenobs.push(screenob);
  screenob = new ScreenObject("Enter",width*0.6,height*0.7,width*0.3,height*0.2,true);
  screenob.clickfunc = function() {
    if (gamecode >=1000){    
      joingame();
    }else{
      gamecode=0;
    }
  }
  screenobs.push(screenob);
}

function addnumbut(num,x,y,w,h){
  var screenob = new ScreenObject(num.toString(),x,y,w,h,true); 
  screenob.clickfunc = function() {
    gamecode = gamecode*10+num;
    if (gamecode>=10000){
      gamecode=num;
    }
  }
  screenobs.push(screenob);
}


function joingame(){
  var tosend = {
    x: mouseX,
    text:"Some different text"
  };
  socket.emit('joingame',gamecode);
}

function gameStarted(location){
  gameinprog=true;
  if (mode == "host"){
    clearscreen();
    screenobs.push(new ScreenObject(location.toString(),100,100,100,100,false));  
  }
    

}

function setmainmenu(){
  clearscreen();
  // var screenob = new ScreenObject("start game",100,100,50,50,true);
  var screenob = new ScreenObject("start game",width*0.1,height*0.1,width*0.35,height*0.8,true);
  screenob.clickfunc = function(){
    clickedstartgame();
  }
  screenobs.push(screenob)
  //screenob = new ScreenObject("join game",200,100,50,50,true);
  screenob = new ScreenObject("join game",width*0.55,height*0.1,width*0.35,height*0.8,true);
  screenob.clickfunc = function(){
    clickedjoingame();
  }
  screenobs.push(screenob)
}

function clearscreen(){
  screenobs.splice(0,screenobs.length);
}

function shuf(x){
  var temp_val;
  var temp_index;
  for (i=x.length-1;i>0;i--){
    temp_index = floor(random(i+1));
    if (temp_index != i){
      temp_val = x[i];
      x[i] = x[temp_index];
      x[temp_index] = temp_val;
    }
  }
}
