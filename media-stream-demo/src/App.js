import React, { useEffect, useRef } from "react";

function App() {
  const videoRef = useRef(null);
  const recorderRef = useRef(null);

  useEffect(() => {
    const constraints = { audio: false, video: true };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;

        // メディアレコーダーを作成
        recorderRef.current = new MediaRecorder(stream);

        recorderRef.current.ondataavailable = function (e) {
          var testvideo = document.getElementById("test");
          var outputdata = window.URL.createObjectURL(e.data);
          testvideo.src = outputdata;
        };
      })
      .catch((err) => {
        console.error("エラー:", err);
      });
  }, []);

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

export default App;
