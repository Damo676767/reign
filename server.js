var express = require('express');

var app = express();

const port = process.env.PORT ||3000;

var server = app.listen(port);

app.use(express.static('public'));

console.log("Running");





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
