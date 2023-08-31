const cameraFeed = document.getElementById("cameraFeed") as HTMLVideoElement;

async function setupCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    cameraFeed.srcObject = stream;
  } catch (error) {
    console.error("Error accessing camera:", error);
  }
}

setupCamera();
