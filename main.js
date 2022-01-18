function setup(){
    var canvas =  createCanvas(700,600);
    canvas.parent('canvas');
    
    video = createCapture(VIDEO);
    video.size(700, 600);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    }



    function preload() {
        ball_touch_paddel = loadSound("ball_touch_paddel.wav");
        missed = loadSound("missed.wav");
      }


      
function gotPoses(results)
{
  if(results.length > 0)
  {

    rightWristY = results[0].pose.rightWrist.y;
    rightWristX = results[0].pose.rightWrist.x;
    scoreRightWrist =  results[0].pose.keypoints[10].score;
    console.log(scoreRightWrist);
  }
}


function draw(){

    background(0); 
    image(video, 0, 0, 700, 600);
  
    fill("black");
    stroke("black");
    rect(680,0,20,700);
  
    fill("black");
    stroke("black");
    rect(0,0,20,700);
  
    if(scoreRightWrist > 0.2)
    {
      fill("red");
      stroke("red");
      circle(rightWristX, rightWristY, 30);
    }
  
    if(game_status == "start")
    {
      document.getElementById("status").innerHTML = "Game Is Loaded";
      //funtion paddleInCanvas call 
      paddleInCanvas();
          
      //left paddle
      fill(250,0,0);
      stroke(0,0,250);
      strokeWeight(0.5);
      paddle1Y = rightWristY; 
      rect(paddle1X,paddle1Y,paddle1,paddle1Height,100);
  
  
      //pc computer paddle
      fill("#FFA500");
      stroke("#FFA500");
      var paddle2y =ball.y-paddle2Height/2;  rect(paddle2Y,paddle2y,paddle2,paddle2Height,100);
      
      //function midline call
      midline();
      
      //funtion drawScore call 
      drawScore();
  
      //function models call  
      models();
  
      //function move call which in very important
      move();
  
      }
  
    }