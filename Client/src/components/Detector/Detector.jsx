import * as faceapi from "face-api.js";
import React, { useEffect, useState } from "react";
import "./Detector.css";
import axios from "axios";
import PlaylistSection from "./PlaylistSection";

function Detector() {
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [emotions, setEmotions] = useState({
    emotion_type: "",
    emotion_dominance: null,
  });

  const [emotionPlaylists, setEmotionPlaylists] = useState();
  const [captureVideo, setCaptureVideo] = React.useState(false);
  const [isHandleVideoEnded, setIsHandleVideoEnded] = useState(false);

  const videoRef = React.useRef();
  const videoHeight = 480;
  const videoWidth = 640;

  const canvasRef = React.useRef();

  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const callForAPI = (emotions) => {
    console.log(emotions);
    axios
      .post("/getEmotionPlaylist", { emotion: emotions.emotion_type })
      .then((res) => {
        setEmotionPlaylists(res.data);
      });
  };
  React.useEffect(() => {
    if (isHandleVideoEnded && emotions.emotion_type !== "") {
      callForAPI(emotions);
    }
  }, [isHandleVideoEnded]);

  const handleVideoOnPlay = async () => {
    const interval = setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
          videoRef.current
        );
        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        };

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        // console.log(detections[0])
        const expressions = detections[0].expressions;
        const maxExpression = Math.max(...Object.values(expressions));
        console.log(maxExpression);
        const dominantEmotion = Object.keys(expressions).find(
          (key) => expressions[key] === maxExpression
        );

        setEmotions((prev) => ({ ...prev, emotion_dominance: maxExpression }));
        setEmotions((prev) => ({ ...prev, emotion_type: dominantEmotion }));

        canvasRef &&
          canvasRef.current &&
          canvasRef.current
            .getContext("2d")
            .clearRect(0, 0, videoWidth, videoHeight);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawFaceExpressions(
            canvasRef.current,
            resizedDetections
          );
      }
    }, 100);
    // interval()

    setTimeout(() => {
      // console.log("Hello")
      clearInterval(interval);
      closeWebcam();
      setIsHandleVideoEnded(true);
    }, 5000);
  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  };

  return (
    <div>
      <div className="detector-inner">
        <div className="detector-sub-div">
          <h1>
            <span className="animate-charcter" style={{ color: "green" }}>
              AmplifAI
            </span>{" "}
            SPG
          </h1>
          <p>
            Unlock the power of your emotions through music. Our cutting-edge
            technology reads your facial expressions, decodes your emotions, and
            creates a personalized playlist just for you. Experience a journey
            where your face becomes the gateway to a world of melodies that
            amplify your every mood. AmplifAI Sentiments Playlist Generator:{" "}
            <br />
            <em>Your emotions, elevated through music.</em>
          </p>
        </div>
        <div className="detector-sub-div2">
          <img src="/icons/face.png" alt="" width={550} height={550} />
        </div>
      </div>

      <div className="webcamAccess">
        {emotions.emotion_type !== "" && modelsLoaded && emotionPlaylists ? (
          <div className="playlist-middle">
            <PlaylistSection playlist={emotionPlaylists} />
          </div>
        ) : (
          <>
            <span className="webcam-text">For this feature you have to</span>
            <button
              onClick={startVideo}
              className="button"
              style={{ backgroundColor: "green", border: "1px solid green" }}
            >
              Open Webcam
            </button>
          </>
        )}
      </div>

      {captureVideo ? (
        modelsLoaded ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              <video
                ref={videoRef}
                height={videoHeight}
                width={videoWidth}
                onPlay={handleVideoOnPlay}
                style={{ borderRadius: "10px" }}
              />
              <canvas ref={canvasRef} style={{ position: "absolute" }} />
            </div>
          </div>
        ) : (
          <div>loading...</div>
        )
      ) : (
        <></>
      )}
    </div>
  );
}

export default Detector;
