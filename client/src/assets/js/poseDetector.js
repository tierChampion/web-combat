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

    /**
     * Initialise the detector tensorflow model.
     */
    async init() {
        await tf.setBackend('webgl');
        this.detector = await poseDetection.createDetector(
            poseDetection.SupportedModels.MoveNet,
            CONFIG);
    }

    /**
     * Detect a person inside of an image.
     * @param {PixelInput} image - image that contains a person to detect
     * @returns - an array of vertices with their score 
     */
    async detect(image) {
        if (this.detector === null) return [];
        const mesh = await this.detector.estimatePoses(image);
        if (mesh.length !== 0)
            return mesh[0].keypoints;
        else
            return mesh;
    }
};

export default PoseDetector;
