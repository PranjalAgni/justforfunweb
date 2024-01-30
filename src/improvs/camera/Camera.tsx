import { useEffect, useRef, useState } from "react";
import "./Camera.css";

function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPlayingRef = useRef(true);
  const [videoElementStyles, setVideoElementStyles] = useState({});

  useEffect(() => {
    const updateWindowDetails = () => {
      const windowDetails = {
        screenX: window.screenX,
        screenY: window.screenY,
        screenWidth: window.screen.availWidth,
        screenHeight: window.screen.availHeight,
        width: window.outerWidth,
        height: window.innerHeight,
        updated: Date.now(),
      };

      setVideoElementStyles({
        ...videoElementStyles,
        transform: `translate(-${window.screenX}px, -${window.screenY}px)`,
      });

      console.log("Window details: ", windowDetails);
    };

    window.addEventListener("drag", updateWindowDetails);

    return () => {
      window.removeEventListener("resize", updateWindowDetails);
    };
  }, []);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video = videoRef.current as HTMLVideoElement;
        video.srcObject = stream;
        video.width = window.screen.availWidth;
        video.height = window.screen.availHeight;
        video.play();
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };

  useEffect(() => {
    console.log("Populate video: ", isPlayingRef.current);
    if (isPlayingRef.current) {
      getVideo();
    }
    isPlayingRef.current = false;
  }, []);

  const stopVideo = () => {
    if (videoRef.current) {
      const video = videoRef.current as HTMLVideoElement;
      video.src = "";
      (video.srcObject as MediaStream).getTracks()[0].stop();
    }
  };
  return (
    <>
      {/* <button onClick={getVideo}>Stream video</button> */}
      {/* <button onClick={stopVideo}>Stop video</button> */}
      <video className="webcam" style={videoElementStyles} ref={videoRef} />
    </>
  );
}

export default Camera;
