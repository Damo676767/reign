
let mcard = [];
let chosen_card;

function preload(){
  var mcarddata = getmcarddata();
  for (i=0;i<mcarddata.length;i++){
   for (j=0;j<mcarddata[i].multiplicity;j++){
     mcard.push(new MilCard(mcarddata[i]));
   }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  chosen_card = mcard[7];
}

function draw() {
  background(255);
 
  stroke(0);  
  textSize(20);
  text (chosen_card.house+" "+chosen_card.name,50,50);


  
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
