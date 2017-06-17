var bufferLength;
var dataArray;
var player;
function initPage(){

  alert("Initializing page...");
  player =  document.getElementById('myAudio');
  createAudio(player);
  player.play();

}

function createAudio(player){
  var self = this;
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray); // get waveform data and put it into the array created above
  console.log("dataArray: " + dataArray)
  console.log(bufferLength)
  console.log(analyser)


};


var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");

//create te container that will hold the boincing balls.
var container = {
  x: 0,
  y: 0,
  width: 700,
  height: 300
};
//create the array of circles that will be animated
var circles = [{
  x: 20,
  y: 100,
  r: 10,
  vx: 10,
  vy: 9,
  color: 125
}];

function animate() {
var z;
var v;


  c.clearRect(0, 0, canvas.width, canvas.height);
  //draw the container
  c.fillStyle = "rgba(0, 0, 200, 0)";
  c.fillRect(container.x, container.y, container.width, container.height);

  //loop throughj the circles array
  for (var i = 0; i < circles.length; i++) {
    //draw the circles
    c.fillStyle = 'hsl(' + circles[0].color++ + ', 50%, 60%)';
    c.beginPath();
    c.arc(circles[0].x, circles[0].y, circles[0].r, 0, Math.PI * 2, true);
    c.fill()
  } // first loop

  for(var j = 0; j < bufferLength; j++) {
    v = dataArray[j] / 128.0;
    // console.log("V:" + v);
    z = v * (circles[0].y/2);
    // console.log(z);
    vx = v*z;
    // console.log("vx:" + vx);
    //
    //time to animate our circles ladies and gentlemen.
    if (circles[0].x - circles[0].r + circles[0].vx < container.x || circles[0].x + circles[0].r + circles[0].vx > container.x + container.width) {
        circles[0].vx = -circles[0].vx;

    }

    if (circles[0].y + circles[0].r + circles[0].vy > container.y + container.height || circles[0].y - 10 + circles[0].vy < container.y) {
      circles[0].vy = -circles[0].vy;
    }

    circles[0].x += circles[0].vx;
    circles[0].y += circles[0].vy;
    v += sliceWidth;

  }
  requestAnimationFrame(animate);
}
//
// var v;
// var z;
// var vx;
//
// function draw(){
//   requestAnimationFrame(draw);
//   c.clearRect(0, 0, canvas.width, canvas.height);
//   c.fillStyle = 'hsl(' + circles[0].color++ + ', 50%, 60%)';
//   c.beginPath();
//   c.arc(circles[0].x, circles[0].y, circles[0].r, 0, Math.PI * 2, false);
//   c.fill();
//
// }
//
// draw();

requestAnimationFrame(animate);
