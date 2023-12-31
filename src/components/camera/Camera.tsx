import { useEffect, useRef } from "react";
// went out today
// attended K weddding

// Hunted bugs all day in React codenbase what a experience and frustration lol
function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);

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

      console.log("Window details: ", windowDetails);
    };

    window.addEventListener("resize", updateWindowDetails);

    return () => {
      window.removeEventListener("resize", updateWindowDetails);
    };
  }, []);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 500, height: 500 } })
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

  const stopVideo = () => {
    if (videoRef.current) {
      const video = videoRef.current as HTMLVideoElement;
      video.src = "";
      (video.srcObject as MediaStream).getTracks()[0].stop();
    }
  };
  return (
    <div>
      <button onClick={getVideo}>Stream video</button>
      <button onClick={stopVideo}>Stop video</button>
      <video ref={videoRef} />
    </div>
  );
}

export default Camera;
