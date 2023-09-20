const videoElement = document.getElementById("video") as HTMLVideoElement;
const visionElement = document.getElementById("vision") as HTMLVideoElement;
const startButton = document.getElementById("startButton") as HTMLButtonElement;
const stopButton = document.getElementById("stopButton") as HTMLButtonElement;
let mediaRecorder: MediaRecorder | null = null;
let mediaStream: MediaStream | null = null;

async function setupMedia() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    mediaStream = stream;
    videoElement.srcObject = stream;
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = function (e) {
      if (e.data.size > 0) {
        const blob = new Blob([e.data], { type: "video/webm" });
        visionElement.src = window.URL.createObjectURL(blob);
      }
    };

    mediaRecorder.onstop = function () {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  } catch (error) {
    console.error("エラー:", error);
  }
}

startButton.addEventListener("click", () => {
  if (mediaRecorder) {
    mediaRecorder.start();
  }
});

stopButton.addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
  }
});

setupMedia();
