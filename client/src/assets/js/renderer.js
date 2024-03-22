import fistSrc from "../img/pixel-fist.png";
import faceSrc from "../img/surprised.png";

const EDGE_LIST = [
    ["nose", "left_eye"],
    ["nose", "right_eye"],
    ["left_eye", "left_ear"],
    ["right_eye", "right_ear"],
    ["left_shoulder", "right_shoulder"],
    ["left_shoulder", "left_elbow"],
    ["left_shoulder", "left_hip"],
    ["right_shoulder", "right_elbow"],
    ["right_shoulder", "right_hip"],
    ["left_elbow", "left_wrist"],
    ["right_elbow", "right_wrist"],
    ["left_hip", "right_hip"],
    ["left_hip", "left_knee"],
    ["right_hip", "right_knee"],
    ["left_knee", "left_ankle"],
    ["right_knee", "right_ankle"]
];

class Renderer {

    /**
     * @param {RefObject} canvasRef - Reference to the canvas to draw on
     */
    constructor(canvasRef) {
        this.ctx = canvasRef.current.getContext("2d");
        this.fistImg = new Image();
        this.fistImg.src = fistSrc;
        this.fistImg.onload = function () {
            console.log("Fist Image loaded successfully!");
        }
        this.fistImg.onerror = function () {
            console.error("Fist Image failed to load!");
        }
        this.faceImg = new Image();
        this.faceImg.src = faceSrc;
        this.faceImg.onload = function () {
            console.log("Face Image loaded successfully!");
        }
        this.faceImg.onerror = function () {
            console.error("Face Image failed to load!");
        }
    }

    /**
     * Renders the resulting mesh on the canvas
     * @param {Array} mesh - list of vertices with their score
     */
    renderBodyMesh(mesh) {

        this.ctx.beginPath();
        this.ctx.fillStyle = "#282c34";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        if (mesh?.length === 0) return;

        EDGE_LIST.forEach((edge) => {
            const meshEdge = mesh.filter((vertex) => { return vertex.name === edge[0] || vertex.name === edge[1]; });
            this.renderEdge(meshEdge, '#FFFFFF');
        });

        this.ctx.fillStyle = 'black';
        mesh.forEach((vertex) => {
            this.renderVertex(vertex);
        });

        this.renderFist(mesh.filter((vertex) => { return vertex.name === 'left_wrist'; })[0],
            mesh.filter((vertex) => { return vertex.name === 'left_elbow'; })[0], false, 80);

        this.renderFist(mesh.filter((vertex) => { return vertex.name === 'right_wrist'; })[0],
            mesh.filter((vertex) => { return vertex.name === 'right_elbow'; })[0], true, 80);

        this.renderFace(mesh.filter((vertex) => { return vertex.name === 'nose'; })[0], 120);
    }

    /**
     * Draws a singular vertex
     * @param {Object} vertex - position with score
     */
    renderVertex(vertex) {
        if (vertex.score > 0.1) {
            this.ctx.fillRect(vertex.x, vertex.y, 2, 2);
        }
    }

    /**
     * Draws a singular edge
     * @param {Array} edge - list of two vertices
     * @param {color} color - color to draw the edge in
     */
    renderEdge(edge, color) {
        if (edge[0].score > 0.1 && edge[1].score > 0.1) {
            this.ctx.moveTo(edge[0].x, edge[0].y);
            this.ctx.lineTo(edge[1].x, edge[1].y);
            this.ctx.lineWidth = 5;
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
        }
    }

    renderFist(handVertex, elbowVertex, isRight, dimension) {
        this.ctx.save();
        const factor = isRight ? -1 : 1;
        this.ctx.scale(factor, 1);
        this.ctx.translate(factor * handVertex.x, handVertex.y);
        const angle = Math.atan2(handVertex.y - elbowVertex.y,
            factor * (handVertex.x - elbowVertex.x));
        this.ctx.rotate(angle);
        this.ctx.drawImage(this.fistImg, 0, 0, dimension, dimension);
        this.ctx.restore();
    }

    renderFace(noseVertex, dimension) {
        this.ctx.drawImage(this.faceImg, noseVertex.x - dimension / 2, 
        noseVertex.y - dimension / 2, dimension, dimension);
    }
};

export default Renderer;
