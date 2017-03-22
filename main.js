function calcd1(strike, spot, time, vol, rate){
  var lefthand = 0;
  var righthand = 0;
  lefthand = 1/(vol*Math.sqrt(time));
  righthand = Math.log(spot/strike)+((rate+((vol*vol)/2))*time);
  return lefthand*righthand;
}

function calcd2(vol, time, d1){
  return d1-(vol*Math.sqrt(time));
}

function putprice(strike,spot,time,vol,rate){
  var d1 = calcd1(strike,spot,time,vol,rate);
  var d2 = calcd2(vol,time,d1);
  var lefthand=normalcdf(0,1,-d2)*strike*(Math.pow(Math.E,(-rate)*time));
  var righthand=normalcdf(0,1,-d1)*spot;
  return lefthand - righthand;
}

function callprice(strike, spot, time, vol, rate){
  var d1 = calcd1(strike,spot,time,vol,rate);
  var d2=calcd2(vol,time,d1);
  var lefthand=normalcdf(0,1,d1)*spot;
  var righthand=normalcdf(0,1,d2)*strike*(Math.pow(Math.E,(-rate)*time));
  return lefthand - righthand;
}

//from http://stackoverflow.com/questions/5259421/cumulative-distribution-function-in-javascript
function normalcdf(mean, sigma, to)
{
    var z = (to-mean)/Math.sqrt(2*sigma*sigma);
    var t = 1/(1+0.3275911*Math.abs(z));
    var a1 =  0.254829592;
    var a2 = -0.284496736;
    var a3 =  1.421413741;
    var a4 = -1.453152027;
    var a5 =  1.061405429;
    var erf = 1-(((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-z*z);
    var sign = 1;
    if(z < 0)
    {
        sign = -1;
    }
    return (1/2)*(1+sign*erf);
}

function hideelement(){
  var x = document.getElementById('info');
  x.style.display='none';
  var y = document.getElementById("info_button");
  y.style.display='none';
  // if (x.style.display == 'none') {
  //     x.style.display = 'block';
  // } else {
  //     x.style.display = 'none';
  // }
}

function handleinput(){

  console.log("submitted values!");

  var option_type = document.getElementById("put_or_call").value;

  var strike=document.getElementById("n1").value;
  var spot=document.getElementById("n2").value;
  var time=document.getElementById("n3").value;
  var vol=document.getElementById("n4").value;
  var rate=document.getElementById("n5").value;

  time=time/365;
  vol=vol/100;
  rate=rate/100;

  var price = 0;

  if(option_type=="call"){
    price=callprice(strike,spot,time,vol,rate);
  }else if(option_type=="put"){
    price=putprice(strike,spot,time,vol,rate);
  }

  var price_box = document.getElementById("price");
  price_box.value=price.toFixed(3);

}
