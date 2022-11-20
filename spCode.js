
export function spCode() {

    setMaxIterations(81342);
    setStepSize(0.8);
    let x = input();
    let y = input();
    let offset = .1//input(0.08, 0, 0.1);
    noLighting();
    let scale = .5;
    color(vec3(0.5, 0.5, 0.5))
    displace(0, 0, 4);
    rotateY(0);
    box(44, 44, 0.2);
    reset();
    color(vec3(0.1, 0.5, 0.5))
    sphere(scale)
    blend(.1);
    // draw input sphere
    displace(x, y, 0)
    color(vec3(0, 1, 0))
    sphere(.2)
}