import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "@vladmandic/face-api";

const VideoRecorder = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [faceValid, setFaceValid] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    };
    loadModels();
    startCamera();
  }, []);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) videoRef.current.srcObject = stream;
  };

  const validateFaceAndLighting = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Resize the canvas to match the video dimensions
    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    faceapi.matchDimensions(canvas, displaySize);

    // Detect faces from the video
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks();

    if (detections.length > 0) {
      const face = detections[0];
      const landmarks = face.landmarks;

      // Analyze lighting by checking brightness of the face region
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, displaySize.width, displaySize.height);
        const faceBox = face.detection.box;
        const faceImageData = ctx.getImageData(
          faceBox.x,
          faceBox.y,
          faceBox.width,
          faceBox.height,
        );
        const avgBrightness = calculateBrightness(faceImageData);
        setFaceValid(avgBrightness > 100); // Threshold for good lighting
      }
    } else {
      setFaceValid(false);
    }
  };

  const calculateBrightness = (imageData: ImageData) => {
    let totalBrightness = 0;
    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
      const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
      totalBrightness += brightness;
    }
    return totalBrightness / (imageData.width * imageData.height);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted width="640" height="480" />
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: "none" }}
      />
      <div>
        <button onClick={validateFaceAndLighting}>
          Validate Face and Lighting
        </button>
        <p>Face Valid: {faceValid ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default VideoRecorder;
