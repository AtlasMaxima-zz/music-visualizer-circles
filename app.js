var bufferLength;
var dataArray;
var player;

navigator.getUserMedia = navigator.getUserMedia
                         || navigator.webkitGetUserMedia
                         || navigator.mozGetUserMedia;
navigator.getUserMedia({ video : false, audio : true }, callback, console.log);

function initPage(){

  alert("Initializing page...");
  player =  document.getElementById('myAudio');
  // createAudio(player)
  callback(stream);
}

function callback(stream) {
    var ctx = new AudioContext();
    var mic = ctx.createMediaStreamSource(stream);
    var analyser = ctx.createAnalyser();
    var osc = ctx.createOscillator();
    mic.connect(analyser);
    osc.connect(ctx.destination);
    osc.start(0);
    var data = new Uint8Array(analyser.frequencyBinCount);
    function play() {
        analyser.getByteFrequencyData(data);
        // get fullest bin
        var idx = 0;
        for (var j=0; j < analyser.frequencyBinCount; j++) {
            if (data[j] > data[idx]) {
                idx = j;
            }
        }
        var frequency = idx * ctx.sampleRate / analyser.fftSize;

        // var myVar= setInterval(function(){draw()}, 1000);
        // console.log("myvar" + myVar);
        draw(frequency);
        osc.frequency.value = frequency;
        requestAnimationFrame(play);
    }
    play();
}


function createAudio(player){
  var self = this;
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var ctx = new AudioContext();

  var analyser = audioCtx.createAnalyser();
  var osc = ctx.createOscillator();
  osc.connect(ctx.destination);
  osc.start(0);
    bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray); // get waveform data and put it into the array created above
  console.log("dataArray: " + dataArray)
  console.log(bufferLength)
  console.log(analyser)
  console.log("Sample Rate: " + audioCtx.sampleRate)
  // get fullest bin
  var idx = 0;
  for (var j=0; j < analyser.frequencyBinCount; j++) {
      if (dataArray[j] > dataArray[idx]) {
          idx = j;
      }
  }

  var frequency = idx * ctx.sampleRate / analyser.fftSize;
  console.log("FREQ" + frequency);
  osc.frequency.value = frequency;


};


var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");

//create te container that will hold the boincing balls.
var container = {
  x: 0,
  y: 0,
  width: 1000,
  height: 1000
};
//create the array of circles that will be animated
var circles = [{
  x: 200,
  y: 100,
  r: 10,
  vx: 10,
  vy: 9,
  color: 125
}];
//
// function animate() {
// var z;
// var v;
//
//
//   c.clearRect(0, 0, canvas.width, canvas.height);
//   //draw the container
//   c.fillStyle = "rgba(0, 0, 200, 0)";
//   c.fillRect(container.x, container.y, container.width, container.height);
//
//   //loop throughj the circles array
//   for (var i = 0; i < circles.length; i++) {
//     //draw the circles
//     c.fillStyle = 'hsl(' + circles[0].color++ + ', 50%, 60%)';
//     c.beginPath();
//     c.arc(circles[0].x, circles[0].y, circles[0].r, 0, Math.PI * 2, true);
//     c.fill()
//   } // first loop
//
//   for(var j = 0; j < bufferLength; j++) {
//     v = dataArray[j] / 128.0;
//     // console.log("V:" + v);
//     z = v * (circles[0].y/2);
//     vx = v*z;
//     //time to animate our circles ladies and gentlemen.
//     if (circles[0].x - circles[0].r + circles[0].vx < container.x || circles[0].x + circles[0].r + circles[0].vx > container.x + container.width) {
//         circles[0].vx = -circles[0].vx;
//
//     }
//
//     if (circles[0].y + circles[0].r + circles[0].vy > container.y + container.height || circles[0].y - 10 + circles[0].vy < container.y) {
//       circles[0].vy = -circles[0].vy;
//     }
//
//     circles[0].x += circles[0].vx;
//     circles[0].y += circles[0].vy;
//     v += sliceWidth;
//
//   }
//   requestAnimationFrame(animate);
// }

var x = 300;
var y = 100;
var dx = 4;
var dy = 4;
var radius = 10;
var min = 200;
c.fillStyle = 'hsl(' + circles[0].color++ + ', 60%, 90%)';

function draw(frequency){
  console.log("FREQ " + frequency);
  console.log("RAD" + radius);
  requestAnimationFrame(draw);

  c.clearRect(0, 0, canvas.width, canvas.height);
  c.beginPath();
  if(frequency < 20000){
    c.arc(x, y, frequency/100 , 0, Math.PI * 2, false);
  }
  else{
    c.arc(x, y, radius , 0, Math.PI * 2, false);
  }
  c.fill();

  radius = frequency/100;
  if (x + circles[0].r > canvas.width || x - circles[0].r < 0){
    dx = -dx;
  }

  if (y + circles[0].r > canvas.height || y - circles[0].r < 0){
    dy = -dy;

  }
  if(radius > min){
    x += dx;
    y += dy;
    c.fillStyle = 'hsl(' + circles[0].color++ + ', 50%, 60%)';
    radius = radius + Math.random();
  }

}


//requestAnimationFrame(animate);
