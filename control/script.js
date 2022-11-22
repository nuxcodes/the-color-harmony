import { sculptToMinimalRenderer } from '../shader-park-core.esm.js';
import { spCode } from './spCode.js';

let tiles = document.querySelectorAll('.tiles');
let canvas = [];
let colorInput = [0, 0, 0, 0, 0, 0, 0];
localStorage.setItem('colorInput', colorInput);
const colors = { cyan: [0, 1, 1], red: [1, 0, 0], green: [0, 1, 0], violet: [1, 0, 1], yellow: [1, 1, 0], blue: [0, 0, 1] };
const colorTexts = Object.keys(colors);
console.log(colorTexts);
const width = window.innerWidth;
const height = window.innerHeight;

for (let [i, tile] of tiles.entries()) {
    // create canva
    let canva = document.createElement("canvas", { class: "drawing-tile" });
    canva.style.width = "100%";
    canvas.push(canva);
    tile.appendChild(canva);
    tile.addEventListener('click', () => {
        colorInput[0] = i;
        colorInput[i + 1] += 1;
        localStorage.setItem('colorInput', colorInput);
    });
    // create text
    let p = document.createElement("p",);
    let text = document.createTextNode(colorTexts[i].replace(colorTexts[i][0], colorTexts[i][0].toUpperCase()));
    tile.appendChild(p);
    p.appendChild(text);

    sculptToMinimalRenderer(canva, spCode, () => {
        let c = Object.values(colors)[i];
        let R = c[0];
        let G = c[1];
        let B = c[2];
        return { R: R, G: G, B: B };
    });

}