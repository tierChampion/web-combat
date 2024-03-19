const EDGE_LIST = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 4],
    [5, 6],
    [5, 7],
    [5, 11],
    [6, 8],
    [6, 12],
    [7, 9],
    [8, 10],
    [11, 12],
    [11, 13],
    [12, 14],
    [13, 15],
    [14, 16]
];

class Renderer {

    constructor(canvasRef, webcamRef) {
        this.ctx = canvasRef.current.getContext("2d");
        this.webcam = webcamRef.current;
    }

    renderBodyMesh(mesh, color) {
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.webcam.video.width, this.webcam.video.height);

        EDGE_LIST.forEach((edge) => {
            this.renderEdge([mesh.keypoints[edge[0]], mesh.keypoints[edge[1]]], '#FFFFFF');
        });

        this.ctx.fillStyle = 'black';
        mesh.keypoints.forEach((vertex) => {
            this.renderVertex(vertex);
        });
        console.log(mesh);
    }

    renderVertex(vertex) {
        if (vertex.score > 0.1) {
            this.ctx.fillRect(vertex.x, vertex.y, 2, 2);
        }
    }

    renderEdge(edge, color) {
        if (edge[0].score > 0.1 && edge[1].score > 0.1) {
            this.ctx.moveTo(edge[0].x, edge[0].y);
            this.ctx.lineTo(edge[1].x, edge[1].y);
            this.ctx.lineWidth = 5;
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
        }
    }
};

export default Renderer;
