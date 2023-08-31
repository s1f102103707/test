async function getMedia(constraints) {
  let stream = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    /* ストリームを使用 */
  } catch (err) {
    /* エラーを処理 */
  }
}
function getmedia() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => ($video.srcObject = stream))
    .catch((err) => alert(`${err.name} ${err.message}`));
}
function getCameraAndMic() {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        // ビデオ要素にカメラストリームを関連付け
        videoRef.current?.srcObject = stream;
        // マイクをオンにする
        const audioContext = new AudioContext();
        const micSource = audioContext.createMediaStreamSource(stream);
        // ここで micSource を利用してマイクの音声を処理したり、再生したりできます
        // 他の処理を追加...
      })
      .catch((err) => {
        console.error('エラー:', err);
      });
}
  
