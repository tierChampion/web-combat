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

  useEffect(() => {
    rendererRef.current = new Renderer(canvasRef, webcamRef);
    detectorRef.current = new PoseDetector();
    const initDetector = async () => {
      await detectorRef.current.init();
    }
    initDetector();
  }, []);

  const handleFrame = async () => {
    const mesh = await detectorRef.current.detect(webcamRef.current.video);

    rendererRef.current.renderBodyMesh(mesh, 'white');
  };

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
      <button onClick={() => handleFrame()}>detect</button>
    </div>
  );
}

export default Fight;
