class Renderer {

    constructor(canvasRef, webcamRef) {
        this.ctx = canvasRef.current.getContext("2d");
        this.webcam = webcamRef.current;
    }

    renderCameraImage() {
        const video = this.webcam.video;
        this.ctx.drawImage(video, 0, 0, video.width, video.height);
    }

    renderBodyMesh(mesh, color) {
        this.ctx.clearRect(0, 0, this.webcam.video.width, this.webcam.video.height);
        // render mesh...
    }

    renderVertex(vertex, color) {

    }
};

export default Renderer;
