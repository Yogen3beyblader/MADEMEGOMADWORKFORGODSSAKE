var song = "";
var objectdetector = "";
var status = "";
var Objects= [];
var webcam;
function preload ()
{
song = loadSound("alert.mp3");
}

function setup()
{
Canvas=createCanvas(380, 380);
Canvas.center();
webcam=createCapture(VIDEO);
webcam.size(380,380);
webcam.hide();
objectdetector=ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("STATUSiscrazy").innerHTML="Status: Detecting Objects";
}

function modelLoaded()
{
console.log("ModelISLoaded");
status=true;
}

function gotResults(error,result) {
if (error) {
    console.log(error);
}
else {
    console.log(result);
    Objects= result;
}
}

function draw () 
{
image(webcam,0,0,380,380);

if(status!="") {
    objectdetector.detect(webcam,gotResults);
for(var i = 0; i<Objects.length; i++) {
    document.getElementById("STATUSiscrazy").innerHTML="Status :Objects Detected";
    fill("#7A00B2");
    var percent=floor(Objects [i].confidence*100);
    text(Objects [i].label + " " + percent + "%",Objects [i].x, Objects [i].y)
    noFill();
    stroke("#7A00B2");
    rect(Objects [i].x, Objects [i].y, Objects [i].width, Objects [i].height);
    if (Objects[i].label=="person") {
        document.getElementById("STATUSiscraycray").innerHTML="~Baby Found~";
        song.stop();
    }
    else {
        document.getElementById("STATUSiscraycray").innerHTML="~!!Baby NOT FOUND!!~";
        song.play();
    }
}
if(Objects.length==0) {
    document.getElementById("STATUSiscraycray").innerHTML="~!!Baby NOT FOUND!!~";
    song.play();
}
}
}