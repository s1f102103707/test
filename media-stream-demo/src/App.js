import React, { useEffect, useRef } from "react";

function App() {
  const videoRef = useRef(null);

  useEffect(() => {
    const constraints = { audio: true, video: true };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("エラー:", err);
      });
  }, []);

  return (
    <div className="App">
      <video ref={videoRef} autoPlay playsInline muted />
    </div>
  );
}

export default App;
