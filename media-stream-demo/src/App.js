import React, { useRef } from "react";

function App() {
  const videoRef = useRef(null);
  const recorderRef = useRef(null);

  const constraints = { audio: true, video: true };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      videoRef.current.srcObject = stream;
      recorderRef.current = new MediaRecorder(stream);

      recorderRef.current.ondataavailable = function (e) {
        let testvideo = document.getElementById("test"); //id='test'で動画を取得している
        let outputdata = window.URL.createObjectURL(e.data); //録画された動画
        testvideo.src = outputdata;
      };
    })
    .catch((err) => {
      console.error("エラー:", err);
    });

  const startRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stop();
    }
  };

  return (
    <div className="App">
      <video ref={videoRef} autoPlay playsInline muted />
      <video id="test" autoPlay playsInline />
      <button onClick={startRecording}>start</button>
      <button onClick={stopRecording}>stop</button>
    </div>
  );
}
// <video id="test" autoPlay playsInline />これで録画された映像が表示される
export default App;
