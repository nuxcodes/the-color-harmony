export function spCode() {
    setMaxIterations(80);
    let R = input();
    let G = input();
    let B = input();
    color(vec3(0.011, 0.011, 0.011))
    displace(0, 0, 4);
    rotateY(0);
    box(44, 44, 0.2);
    reset();
    color(R, G, B);
    let scale = 0.5;
    sphere(scale);
}