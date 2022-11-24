function display() {

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

    const colorRGB = Object.values(colors);
    console.log(colorRGB);

    function compare(array1, array2) {
        return array1.length === array2.length && array1.every(function (value, index) { return value === array2[index] });
    }

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
                rgb = rgb.map((val, j) => val += colorRGB[i][j] * rec.count);
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
            this.rgb = colorRGB[random(0, 5)]
            let times = random(3, 6);
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
            if (this.record[i].dist <= 0) {
                console.log("Animation stopped");
                this.record[i].animating = false;
                this.setPos(i, 0);
                if (!isSuccess) {
                    this.record[i].count += 1;
                    localStorage.setItem('agent', 0);
                    localStorage.setItem('colorOutput', this.record.map((val) => val.count));
                    let rgb = this.mix();
                    if (compare(rgb, [0.5, 0.5, 0.5])) {
                        console.log('Display says success');
                        success();
                    } else {
                        let times = this.record.map((val) => val.count).reduce((x, y) => x + y, 0);
                        if (times === 40) {
                            textBlock = document.createElement("div");
                            textBlock.className = "text-block";
                            document.querySelector("#main-page").append(textBlock);
                            let img = document.createElement("img");
                            img.src = "/assets/take_a_break.png";
                            img.className = "text-block__img";
                            textBlock.appendChild(img);
                            let p = document.createElement("p");
                            p.className = "text-block__text";
                            let text = document.createTextNode("[ You've tried almost 40 times! Keep trying to dismiss. ]");
                            p.appendChild(text);
                            textBlock.appendChild(p);
                        }
                        if (times === 41) {
                            if (textBlock) document.querySelector("#main-page").removeChild(textBlock);
                        }
                    }
                }
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



    function reset() {
        ballController = new BallController(ball);
        let colorOutput = ballController.record.map((val) => val.count);
        localStorage.setItem('colorOutput', colorOutput);
        localStorage.setItem('success', 0);
        isSuccess = 0;
        if (textBlock) document.querySelector("#main-page").removeChild(textBlock);
    }

    function success() {
        localStorage.setItem("success", 1);
        for (let i = 0; i < 6; i++) {
            ballController.record[i].dist = 0;
        }
        isSuccess = 1;

        if (textBlock) document.querySelector("#main-page").removeChild(textBlock);
        textBlock = document.createElement("div");
        textBlock.className = "text-block";
        document.querySelector("#main-page").append(textBlock);
        let img = document.createElement("img");
        img.src = "/assets/congrats.png";
        img.className = "text-block__img";
        textBlock.appendChild(img);
        let p = document.createElement("p");
        p.className = "text-block__text";
        let text = document.createTextNode("[ You created the \"perfect grey\" ]");
        p.appendChild(text);
        textBlock.appendChild(p);
    }

    let canvas = document.querySelector('.my-canvas');
    let canvas2 = document.querySelector('div');
    let ball = new Ball();
    let ballController;
    let isSuccess;
    let isStarted = 1;
    let textBlock;

    reset();
    let colorInput = localStorage.getItem('colorInput');
    localStorage.setItem('agent', 0);
    if (!localStorage.getItem('started')) localStorage.setItem('started', 1);
    if (!colorInput) {
        colorInput = [0, 0, 0, 0, 0, 0, 0];
        localStorage.setItem('colorInput', colorInput);
    };

    window.addEventListener('storage', () => {
        console.log("Storage");
        if (localStorage.getItem('started') === '0' && isStarted === 1) {
            isStarted = 0;
            if (textBlock) document.querySelector("#main-page").removeChild(textBlock);
            textBlock = document.createElement("div");
            textBlock.className = "text-block";
            document.querySelector("#main-page").append(textBlock);
            let img = document.createElement("img");
            img.src = "/assets/home.png";
            img.className = "text-block__img";
            textBlock.appendChild(img);
            let p = document.createElement("p");
            p.className = "text-block__text";
            let text = document.createTextNode("[ Can you blend the blob into the background? ]");
            p.appendChild(text);
            textBlock.appendChild(p);
        }
        if (localStorage.getItem('agent') === '0') return;

        else if (localStorage.getItem('started') === '1' && isStarted === 0) {
            if (textBlock) document.querySelector("#main-page").removeChild(textBlock);
        }
        let newInput = localStorage.getItem('colorInput').split(',').map((val) => parseInt(val));
        if (newInput[0] === -1) {
            console.log("Experience reset.");
            reset();
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
    });

    // This converts your Shader Park code into a shader and renders it to the my-canvas element
    window.sculptToMinimalRenderer(canvas, window.spCodeDisplay, () => {

        for (let [i, val] of ballController.record.entries()) {
            if (val.animating)
                ballController.animate(i)
        }
        return ball;
    });
}

display();
