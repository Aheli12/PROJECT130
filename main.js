peter_song="";
harry_song="";
leftwrist_x = 0;
leftwrist_y = 0;
rightwrist_x = 0;
rightwrist_x = 0;
sc_lwrist = 0;
peter_status = "";
sc_rwrist = 0;
harry_status = "";

function preload(){
    harry_song=loadSound("music.mp3");
    peter_song=loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

     posenet = ml5.poseNet(video, modelloaded);
     posenet.on("pose", gotposes);
}

function preload(){
    peter_song = loadSound("music2.mp3");
    harry_song = loadSound("music.mp3");
}

function draw(){
    image(video,0,0 , 600,500);

    fill("#37ff00");
    stroke("#ff0000");

    peter_status = peter_song.isPlaying();
    console.log("PETER PAN SONG : " + peter_status);

    harry_status = harry_song.isPlaying();
    console.log("HARRY POTTER THEME SONG : " + harry_status);

    if(sc_lwrist > 0.2){
        circle(leftwrist_x, leftwrist_y, 20);
        harry_song.stop();
        if(peter_status == false){
            peter_song.play();
        }

        else{
            document.getElementById("status").innerHTML = "Song name is Peter Pan Song";
        }
    }

    if(sc_rwrist > 0.2){
        circle(rightwrist_x, rightwrist_y, 20);
        peter_song.stop();
        if(harry_status == false){
            harry_song.play();
        }

        else{
            document.getElementById("status").innerHTML = "Song name is Harry Poter Theme  Song";
        }
    }
}

function modelloaded(){
    console.log("PoseNet is initialised!!!");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        sc_lwrist = results[0].pose.keypoints[9].score;
        console.log("Score of left wrist : " + sc_lwrist);

        sc_rwrist = results[0].pose.keypoints[10].score;
        console.log("Score of right wrist : " + sc_rwrist);

        leftwrist_x = results[0].pose.leftWrist.x;
        leftwrist_y = results[0].pose.leftWrist.y;
        console.log("LeftWrist x : " +leftwrist_x + "LeftWrist y : "+ leftwrist_y);

        rightwrist_x = results[0].pose.rightWrist.x;
        rightwrist_y = results[0].pose.rightWrist.y;
        console.log("RightWrist x : " +rightwrist_x + "RightWrist y : "+ rightwrist_y);
    }
}