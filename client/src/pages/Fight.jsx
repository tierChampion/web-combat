import '../assets/styles/Fight.css';
import { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import Renderer from '../assets/js/renderer';

const Fight = () => {

  const canvasRef = useRef(null);
  const webcamRef = useRef(null);
  const rendererRef = useRef(null);

  const dimensions = { width: 600, height: 300 };
  const constraints = { width: dimensions.width, height: dimensions.height, facingMode: "user" };

  useEffect(() => {
    rendererRef.current = new Renderer(canvasRef, webcamRef);
    console.log("what");
  }, []);

  return (
    <div className="fight">
      <Webcam
        audio={false}
        width={dimensions.width}
        height={dimensions.height}
        screenshotFormat="image/jpeg"
        videoConstraints={constraints}
        className="webcam"
        ref={webcamRef}
      />
      <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} />
      <button onClick={() => rendererRef.current.renderCameraImage()}>image change</button>
    </div>
  );
}

export default Fight;
