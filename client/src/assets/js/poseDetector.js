import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection'

const CONFIG = {
    modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
    minPoseScore: 0.1,
    enableSmoothing: true,
    multiPoseMaxDimension: 512
};

class PoseDetector {

    constructor() {
        this.detector = null;
    }

    async init() {
        await tf.setBackend('webgl');
        this.detector = await poseDetection.createDetector(
            poseDetection.SupportedModels.MoveNet,
            CONFIG);
    }

    async detect(image) {
        const mesh = await this.detector.estimatePoses(image);
        return mesh[0];
    }
};

export default PoseDetector;
