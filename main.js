// www.shaderpark.com
// All the code below is javascript that's compiled into a shader





import { sculptToMinimalRenderer } from 'https://unpkg.com/shader-park-core/dist/shader-park-core.esm.js';
import { spCode } from './spCode.js';

let canvas = document.querySelector('.my-canvas');
let canvas2 = document.querySelector('.canvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let state = {
    x: 1,
    y: 1,
};
let test = 5;

// canvas.addEventListener('mouseover', () => state.buttonHover = 5, false);
// canvas.addEventListener('mouseout', () => state.buttonHover = 0.0, false);
// canvas.addEventListener('mousedown', () => state.click = 1.0, false);
// canvas.addEventListener('mouseup', () => state.click = 0.0, false);

// This converts your Shader Park code into a shader and renders it to the my-canvas element
sculptToMinimalRenderer(canvas, spCode, () => {
    state.x -= 0.001;
    state.y -= 0.001;
    return {
        'x': state.x,
        'y': state.y,
    };
});

// StackBlur.canvasRGB(canvas2, 0, 0, width, height, 10);

