import { sculptToMinimalRenderer } from '/shader-park-core.esm.js';
import { spCodeDisplay } from '/scripts/spCode.js';

let canvas = document.querySelector('.my-canvas');
let canvas2 = document.querySelector('div');

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
const colorVals = Object.values(colors);
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

    mix() {
        let count = 0;
        let rgb = [0, 0, 0];
        for (let [i, rec] of this.record.entries()) {
            rgb = rgb.map((val, j) => val += colorVals[i][j] * rec.count);
            count += rec.count;
        }
        rgb = rgb.map((val) => val / count);
        this.ball.R = rgb[0];
        this.ball.G = rgb[1];
        this.ball.B = rgb[2];
        console.log(rgb);
        return rgb;
    }

    init() {
        this.rgb = colorVals[random(0, 5)]
        let times = random(2, 5);
        let values = Object.values(colors);
        for (let i = 0; i < times; i++) {
            let c = random(0, 5);
            this.record[c].count += 1;
            this.mix();
        }

    }

    animate(i) {
        this.record[i].dist -= this.speed;
        this.setPos(i, easeOutSine(this.record[i].dist / this.dist) * this.dist)
        if (this.record[i].dist < 0) {
            this.record[i].count += 1;
            console.log("Animation stopped");
            this.record[i].animating = false;
            this.setPos(i, 0);
            this.mix();
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
let colorInput = localStorage.getItem('colorInput');
if (!colorInput) {
    colorInput = [0, 0, 0, 0, 0, 0, 0];
    localStorage.setItem('colorInput', colorInput);
};

window.onstorage = () => {
    console.log("Storage");
    let newInput = localStorage.getItem('colorInput').split(',').map((val) => parseInt(val));
    if (newInput[0] === -1) {
        console.log("Experience reset.");
        ballController = new BallController(ball);
        return;
    }
    let i = newInput[0];
    if (ballController.record[i].animating === true)
        return;
    else {
        colorInput = newInput;
        // set initial position
        ballController.setPos(i, dist)
        ballController.record[i].animating = true;
        ballController.record[i].dist = dist;

    }


};

// This converts your Shader Park code into a shader and renders it to the my-canvas element
sculptToMinimalRenderer(canvas, spCodeDisplay, () => {

    for (let [i, val] of ballController.record.entries()) {
        if (val.animating)
            ballController.animate(i)
    }
    return ball;
});

// StackBlur.canvasRGB(canvas2, 0, 0, width, height, 10);

