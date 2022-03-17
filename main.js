function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier= ml5.imageClassifier("mobileNet",modelloded);
}
function modelloded()
{
  console.log("modelloded");
}
function draw()
{
  image(video,0,0,300,300);
  classifier.classify(video,gotAnswer);
}
var previos_result=" ";
function gotAnswer(error,result)
{
  if(error){
    console.error(error);
  }   
  else{
    if((result[0].confidence>0.5)&&(previos_result!=result[0].label)){
      console.log(result);
      previos_result=result[0].label;
      var synth=window.speechSynthesis;
      speak_data="object detected is "+result[0].label;
      var utterthis=new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterthis);
      document.getElementById("Object_name").innerHTML=result[0].label;
      document.getElementById("Object_Accuracy").innerHTML=result[0].confidence.toFixed(3);
    }
  }
}


