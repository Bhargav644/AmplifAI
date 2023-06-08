import * as faceapi from "face-api.js";
import React, { useEffect, useState } from "react";
import "./Detector.css";
import axios from "axios";
import PlaylistSection from "./PlaylistSection";
import  secureLocalStorage  from  "react-secure-storage";
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
    document.getElementById("detector-inner").style.display="none";
    // document.getElementById("webcamAccess").style.display="none";
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
    // console.log(emotions)
    axios.post('/getEmotionPlaylist',{"emotion":emotions.emotion_type}).then((res)=>{
      setEmotionPlaylists(res.data);
      const playlistInStorage=JSON.parse(secureLocalStorage.getItem('playlists'));
      const list=Object.values(playlistInStorage);
      list.push(...Object.values(res.data));
      const updatedPlaylist=Object.assign({},list);
      secureLocalStorage.setItem('playlists',JSON.stringify(updatedPlaylist));
    });

  }
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
        console.log(detections[0].expressions)
        const expressions = detections[0].expressions;
        const maxExpression = Math.max(...Object.values(expressions));
        const dominantEmotion = Object.keys(expressions).find(
          (key) => expressions[key] === maxExpression
        );
        
        if(dominantEmotion==="surprised") {
          setEmotions((prev)=>({...prev,emotion_type:"surprise"}));
        }
        else if(dominantEmotion==="fearful"){
          setEmotions((prev)=>({...prev,emotion_type:"fear"}));
        }
        else{
          setEmotions((prev)=>({...prev,emotion_type: dominantEmotion}));
        }
        setEmotions((prev)=>({...prev,emotion_dominance: maxExpression}));

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
    }, 4000);

  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  };

  return (
    <div>
      <div id="detector-inner" className="detector-inner">
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
      <div  className="webcamAccess">
        {emotions.emotion_type !== "" && modelsLoaded && emotionPlaylists ? (
          <div className="playlist-middle">
            <PlaylistSection playlist={emotionPlaylists} />
          </div>
        ) : (
          <div id="webcam-Access">
            <span className="webcam-text">For this feature you have to</span>
            <button
              onClick={startVideo}
              className="button"
              style={{ backgroundColor: "green", border: "1px solid green" }}
            >
              Open Webcam
            </button>
          </div>
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
