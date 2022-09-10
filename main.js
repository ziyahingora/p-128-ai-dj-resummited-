music1 = "";
music2 = "";
LeftWristY= 0;
LeftWristX= 0;
RightWristX=0;
RightWristY=0;
scoreLeftWrist = 0;
status1="";
status2="";

function preload()
{
    music1=loadSound("music.mp3");
    music2=loadSound("music2.mp3");
    
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000")
    stroke("#FF0000")

    status1=music1.isPlaying();
    
    if(scoreLeftWrist>0.2)
    {
        circle(leftWristX,leftWristY,20);
        music2.stop();
    }
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist =" + scoreRightWrist + "scoreLeftWrist =" + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +"leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY = " + rightWristY);
    }
}