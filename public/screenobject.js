class ScreenObject {

  constructor(text,x,y,w,h,clickable){
    this.text = text;    
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.clickable = clickable;
    this.clickfunc = function() {};
    this.st = 0;
    this.sw = 1;
    this.fl = [255,255,255,0];
    this.textc = 0;
    this.showtext = true;
  }

 clicked(x,y){
    if (this.clickable && x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h){
      return true;
    }
    return false;
  }

  disp(){
    stroke(this.st);
    strokeWeight(this.sw);
    fill(this.fl);
    rect(this.x,this.y,this.w,this.h);
    
    if (this.showtext){
        this.grabtext();
        textAlign(CENTER,CENTER);
        noStroke();
        fill(this.textc);
        var tw=200;
        textSize(tw);        
        while (textWidth(this.text)>this.w||textAscent()>this.h/1.5){
          textSize(--tw);
        }    
        text(this.text,this.x+this.w/2,this.y+this.h/2);
    }
  }

  grabtext(){}

}
