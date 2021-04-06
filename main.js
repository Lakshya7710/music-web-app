best_song_ever_status="";
steal_my_girl_status="";

left_wristX=0;
left_wristY=0;
right_wristX=0;
right_wristY=0;
leftWrist_score=0;
rightWrist_score=0;


function setup(){
    canvas=createCanvas(500,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(500,400)
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("model os loaded!!!!!!!!!!!!!!!!!!!!!!!!");
    status=true;
}

function preload(){
    song1=loadSound("best_song_ever.mp3");
    song2=loadSound("Steal My Girl.mp3");
}


function draw(){
    image(video,0,0,500,400)
    fill("red");
    stroke("red");
    best_song_ever_status=song1.isPlaying();
    steal_my_girl_status=song2.isPlaying();

    if (leftWrist_score>0.2){
        circle(left_wristX,left_wristY,30)
        song2.stop();
        if(best_song_ever_status==false){
            song1.play()
            document.getElementById("song_name").innerHTML="Playing : Best Song Ever"
        }
    }

    if(rightWrist_score>0.2){
        circle(right_wristX,right_wristY,30);
        song1.stop();
        if(steal_my_girl_status==false){
            song2.play();
            document.getElementById("song_name").innerHTML="Playing : Steal My Girl"
        }
    }
}


function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWrist_score=results[0].pose.keypoints[9].score;
        left_wristX=results[0].pose.leftWrist.x;
        left_wristY=results[0].pose.leftWrist.y;

        rightWrist_score=results[0].pose.keypoints[10].score;
        right_wristX=results[0].pose.rightWrist.x;
        right_wristY=results[0].pose.rightWrist.y;
        console.log("left wrist x =" + left_wristX + " left wrist y =" + left_wristY);
        console.log("right wrist x =" + right_wristX + " right wrist y =" + right_wristY);
    }
}

function stop_song(){
    song1.pause();
    song2.pause();
}