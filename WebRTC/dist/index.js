var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const videoElement = document.getElementById("video");
const visionElement = document.getElementById("vision");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
let mediaRecorder = null;
let mediaStream = null;
function setupMedia() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const stream = yield navigator.mediaDevices.getUserMedia({
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
        }
        catch (error) {
            console.error("エラー:", error);
        }
    });
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
