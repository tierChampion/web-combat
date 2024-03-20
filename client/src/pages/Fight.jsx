import '../assets/styles/Fight.css';
import { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import Renderer from '../assets/js/renderer';
import PoseDetector from '../assets/js/poseDetector';

const Fight = () => {

  const canvasRef = useRef(null);
  const webcamRef = useRef(null);
  const rendererRef = useRef(null);
  const detectorRef = useRef(null);

  const dimensions = { width: 640, height: 480 };
  const constraints = { width: dimensions.width, height: dimensions.height, facingMode: "user" };

  let lastTime = 0;
  const frameRate = 30;



  useEffect(() => {
    rendererRef.current = new Renderer(canvasRef);
    detectorRef.current = new PoseDetector();

    const handleFrame = async (currentTime) => {

      const elapsedTime = (currentTime - lastTime) / 1000.0;

      const mesh = await detectorRef.current.detect(webcamRef.current.video);
      rendererRef.current.renderBodyMesh(mesh);

      lastTime = currentTime;
      // should handle the about 60 fps by itself
      requestAnimationFrame(handleFrame);
    };

    const initDetector = async () => {
      await detectorRef.current.init();
      // this causes an error because the detector doesnt seem to init...
      await handleFrame();
    }
    initDetector();
  }, []);


  return (
    <div className="fight">
      <div className='container'>
        <Webcam
          audio={false}
          width={dimensions.width}
          height={dimensions.height}
          screenshotFormat="image/jpeg"
          videoConstraints={constraints}
          className="webcam"
          ref={webcamRef}
        />
        <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} className='canvas' />
      </div>
      {/* <button onClick={() => handleFrame()}>detect</button> */}
    </div>
  );
}

export default Fight;
