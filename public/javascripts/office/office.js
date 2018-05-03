// Use constraints to ask for a video-only MediaStream: 
var constraints = {
    audio: true,
    video: true
};
// low res video constraints
var qvgaConstraints = {
    audio: true,
    video: {
        mandatory: {
            maxWidth: 600,
            maxHeight: 600
        }
    }
};

var video = document.querySelector('video');
var showMe = document.querySelector('#showMe');
var saveNote = document.getElementById('saveNote');

// global stream definition
var stream;
// success callback
function successCallback(gotStream) {
    // make stream available to the console
    window.stream = gotStream;
    // Attach the returned stream to the <video> element in the HTML page 
    video.src = window.URL.createObjectURL(stream);
    // play video
    video.play();

    // Record the video
    var mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    showMe.style.visibility = "hidden";
    var stopRecording = document.getElementById('stopRecording');
    stopRecording.style.visibility = "visible";

    var chunks = [];
    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    }
    console.log(chunks);

    stopRecording.addEventListener("click", function() {
        //mediaRecorder.getAudioTracks()[0].stop();
        mediaRecorder.stop();
        video.pause();
        console.log(mediaRecorder.state);
        console.log("recorder stopped");
    });
}
// error callback
function errorCallback(error) {
    console.log('navigator.mediaDevices.getUserMedia:', error);
}

function getMedia(constraints) {
    if (!!stream) {
        video.src = null;
        stream.stop();
    }
    navigator.mediaDevices.getUserMedia(constraints).then(successCallback)["catch"](errorCallback);
}

showMe.addEventListener('click', function(){
   getMedia(qvgaConstraints);
});

// saveNote.addEventListener('click' function(){

// });