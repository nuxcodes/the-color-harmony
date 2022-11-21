import { sculptToMinimalRenderer } from '../shader-park-core.esm.js';
import { spCode } from './spCode.js';

let cells = document.querySelectorAll('.tiles');
let canvas = [];
const colors = { cyan: [0, 1, 1], red: [1, 0, 0], green: [0, 1, 0], violet: [1, 0, 1], yellow: [1, 1, 0], blue: [0, 0, 1] };
const colorTexts = Object.keys(colors);
console.log(colorTexts);
const width = window.innerWidth;
const height = window.innerHeight;

for (let [i, cell] of cells.entries()) {
    // create canva
    let canva = document.createElement("canvas", { class: "drawing-tile" });
    canva.style.width = "100%";
    canvas.push(canva);
    cell.appendChild(canva);
    // create text
    let p = document.createElement("p",);
    let text = document.createTextNode(colorTexts[i]);
    p.style.textAlign = 'center';
    cell.appendChild(p);
    p.appendChild(text);

    sculptToMinimalRenderer(canva, spCode, () => {
        let x = 0.5;
        return { x: 0.5 };
    });

}