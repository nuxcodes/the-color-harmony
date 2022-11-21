// www.shaderpark.com
// All the code below is javascript that's compiled into a shader


import { sculptToMinimalRenderer } from 'https://unpkg.com/shader-park-core/dist/shader-park-core.esm.js';
import { spCode } from './spCode.js';

let canvas = document.querySelector('.my-canvas');
let canvas2 = document.querySelector('div');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


class Ball {
    R = 0;
    G = 0;
    B = 0;
    x0 = 0;
    y0 = 0;
    x1 = 0;
    y1 = 0;
    x2 = 0;
    y2 = 0;
    x3 = 0;
    y3 = 0;
    x4 = 0;
    y4 = 0;
    x5 = 0;
    y5 = 0;
}

const colors = { cyan: [0, 1, 1], red: [1, 0, 0], green: [0, 1, 0], violet: [1, 0, 1], yellow: [1, 1, 0], blue: [0, 0, 1] };
const dist = 1.44;

// random int from [min, max]
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
}

class BallController {
    ball;
    record;
    blobScale = 0.5;
    dist = 1.44;
    speed = 0.015;

    constructor(ball) {
        this.ball = ball;
        this.record = [];
        for (let i = 0; i < 6; i++) {
            this.record.push(new BallCount(0, this.dist))
            this.setPos(i, 0);
        }
        this.init()
    }

    mix(input) {
        let res = [this.ball.R + input[0], this.ball.G + input[1], this.ball.B + input[2]].map((item) => item / 2);
        this.ball.R = res[0];
        this.ball.G = res[1];
        this.ball.B = res[2];
        return res;
    }

    init() {
        let times = random(1, 5);
        let values = Object.values(colors);
        for (let i = 0; i < times; i++) {
            this.mix(values[random(0, 5)])
        }

    }

    animate(i) {
        this.record[i].dist -= this.speed;
        this.setPos(i, easeOutSine(this.record[i].dist / this.dist) * this.dist)
        if (this.record[i].dist < 0) {
            console.log("Animation stopped");
            this.record[i].animating = false;
            this.setPos(i, 0);
            this.mix(Object.values(colors)[i]);
        }
    }

    setPos(i, len) {
        let angle = i * Math.PI / 3;
        this.ball['x' + i.toString()] = len * Math.cos(angle);
        this.ball['y' + i.toString()] = len * Math.sin(angle);
    }

}

class BallCount {
    count;
    dist;
    animating;
    constructor(count, dist) {
        this.count = count;
        this.dist = dist;
        this.animating = false;
    }
}


let ball = new Ball();
let ballController = new BallController(ball);
console.log(ball.R);
console.log(ball.G);
console.log(ball.B);


canvas2.addEventListener('click', () => {
    let i = random(0, 5);
    if (ballController.record[i].animating === true)
        return;
    else {
        // set initial position
        ballController.setPos(i, dist)
        ballController.record[i].animating = true;
        ballController.record[i].dist = dist;
        ballController.record[i].count += 1;
    }

});

// This converts your Shader Park code into a shader and renders it to the my-canvas element
sculptToMinimalRenderer(canvas, spCode, () => {

    for (let [i, val] of ballController.record.entries()) {
        if (val.animating)
            ballController.animate(i)
    }
    return ball;
});

// StackBlur.canvasRGB(canvas2, 0, 0, width, height, 10);

