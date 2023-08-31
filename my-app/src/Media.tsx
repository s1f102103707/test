// import React, { useEffect, useRef, useState } from "react";
// import { CameraOnOfButton } from "~/components/Button/Camera";
// import { MicOnOfButton } from "~/components/Button/Mic";
// import "./Media.css";

// //audioのbooleanとvideoの大きさをpropsで渡す
// type MediaProps = {
//   audio: boolean;
//   video: {
//     width: number;
//     height: number;
//   };
// };

// const WebCameraTest: React.FC<MediaProps> = ({ audio, video }) => {
//   const constraints = {
//     audio: false,
//     video: {
//       width: video.width,
//       height: video.height,
//     },
//   };

//   const videoRef = useRef<HTMLVideoElement>(null);
//   //カメラとマイクのon/offボタンのstateを管理
//   const [mutedState, setMutedState] = useState(false);
//   const micSetter = (isChecked: boolean) => setMutedState(isChecked);
//   const [cameraState, setCameraState] = useState(false);
//   const cameraSetter = (isChecked: boolean) => setCameraState(isChecked);

//   //画面がロードされたタイミングでwebカメラに接続
//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
//       videoRef.current!.srcObject = stream;
//     });
//   }, []);

//   //カメラのon/offボタンの実装
//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ audio: true, video: true })
//       .then((stream) => {
//         videoRef.current!.srcObject = cameraState ? null : stream;
//       });
//   }, [cameraState]);

//   //マイクのon/offボタンの実装
//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ audio: mutedState ? false : true, video: true })
//       .then(() => {});
//     console.log(audio);
//   }, [mutedState]);

//   return (
//     <>
//       <video
//         ref={videoRef}
//         id="local-video"
//         autoPlay
//         playsInline
//         muted
//         width={video.width}
//         height={video.height}
//       />
//       <br />
//       <CameraOnOfButton muted={cameraState} setter={cameraSetter} />
//       <MicOnOfButton muted={mutedState} setter={micSetter} />
//     </>
//   );
// };

// export default WebCameraTest;
