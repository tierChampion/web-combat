import { RefObject } from "react";

// List of valid edges in the mesh
// todo: switch to names for clarity
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
    }

    /**
     * Renders the resulting mesh on the canvas
     * @param {Array} mesh - list of vertices with their score
     */
    renderBodyMesh(mesh) {

        if (mesh?.length === 0) return;

        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        EDGE_LIST.forEach((edge) => {
            const meshEdge = mesh.filter((vertex) => {return vertex.name === edge[0] || vertex.name === edge[1];});
            this.renderEdge(meshEdge, '#FFFFFF');
        });

        this.ctx.fillStyle = 'black';
        mesh.forEach((vertex) => {
            this.renderVertex(vertex);
        });
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
};

export default Renderer;
