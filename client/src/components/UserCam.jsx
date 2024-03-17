import { useRef } from 'react';
import Webcam from 'react-webcam';

const UserCam = () => {

    // webcamRef.current.video to get the video
    const webcamRef = useRef(null);
    const dimensions = { width: 600, height: 300 };
    const constraints = { width: dimensions.width, height: dimensions.height, facingMode: "user" };

    return <div>
        <Webcam
            audio={false}
            width={dimensions.width}
            height={dimensions.height}
            screenshotFormat="image/jpeg"
            videoConstraints={constraints}
            className="webcam"
            ref={webcamRef}
        />
    </div>
};

export default UserCam;
