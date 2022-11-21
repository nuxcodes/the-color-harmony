
export function spCode() {
    setMaxIterations(81342);
    setStepSize(0.8);
    let balls = {
        R: 0,
        G: 0,
        B: 0,
        x0: 0,
        y0: 0,
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        x3: 0,
        y3: 0,
        x4: 0,
        y4: 0,
        x5: 0,
        y5: 0,
    }

    let R = input();
    let G = input();
    let B = input();
    let x0 = input();
    let y0 = input();
    let x1 = input();
    let y1 = input();
    let x2 = input();
    let y2 = input();
    let x3 = input();
    let y3 = input();
    let x4 = input();
    let y4 = input();
    let x5 = input();
    let y5 = input();

    balls.R = R;
    balls.G = G;
    balls.B = B;
    balls.x0 = x0;
    balls.y0 = y0;
    balls.x1 = x1;
    balls.y1 = y1;
    balls.x2 = x2;
    balls.y2 = y2;
    balls.x3 = x3;
    balls.y3 = y3;
    balls.x4 = x4;
    balls.y4 = y4;
    balls.x5 = x5;
    balls.y5 = y5;

    const colors = { cyan: [0, 1, 1], red: [1, 0, 0], green: [0, 1, 0], violet: [1, 0, 1], yellow: [1, 1, 0], blue: [0, 0, 1] };
    const colorVals = Object.values(colors);

    // let balls = new Ball();
    // let offset = .1//input(0.08, 0, 0.1);
    noLighting();
    let scale = .4;
    // draw background box
    color(vec3(0.5, 0.5, 0.5))
    displace(0, 0, 4);
    rotateY(0);
    box(44, 44, 0.2);
    reset();
    // draw central blob
    color(vec3(balls.R, balls.G, balls.B))
    sphere(scale)
    blend(.4);
    // draw input blob
    for (let i = 0; i < 6; i++) {
        let vals = Object.values(balls);
        if (vals[2 * i + 3] != 0 && vals[2 * i + 4]) {
            console.log("drawing ball");
            displace(vals[2 * i + 3], vals[2 * i + 4], 0)
            color(vec3(colorVals[i][0], colorVals[i][1], colorVals[i][2]))
            sphere(.2)
            reset()
        }
    }

}