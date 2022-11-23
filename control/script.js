import { sculptToMinimalRenderer } from '../shader-park-core.esm.js';
import { spCode } from './spCode.js';

let tiles = document.querySelectorAll('.tiles');
let canvas = [];
let colorInput;
reset();

const colors = { cyan: [0, 1, 1], red: [1, 0, 0], green: [0, 1, 0], violet: [1, 0, 1], yellow: [1, 1, 0], blue: [0, 0, 1] };
const colorTexts = Object.keys(colors);
console.log(colorTexts);
const width = window.innerWidth;
const height = window.innerHeight;

function centerChild(parentSelector, childSelector) {
    var parent = $(parentSelector);
    var child = $(childSelector);
    child.css({ top: parent.height() / 2 - child.height() / 2, left: parent.width() / 2 - child.width() / 2 })
}

for (let [i, tile] of tiles.entries()) {
    // create canva
    let canva = document.createElement("canvas");
    canva.className = "drawing--tile";
    canva.style.width = "100%";
    canva.style.position = "absolute";
    canva.style.zIndex = 0;
    canvas.push(canva);
    tile.appendChild(canva);
    tile.addEventListener('click', () => {
        colorInput = i;
        localStorage.setItem('colorInput', colorInput);
    });

    // create text
    let p = document.createElement("p");
    p.className = "color--label";
    p.style.zIndex = 100;
    let text = document.createTextNode(colorTexts[i].replace(colorTexts[i][0], colorTexts[i][0].toUpperCase()));
    tile.appendChild(p);
    p.appendChild(text);

    // render blobs
    sculptToMinimalRenderer(canva, spCode, () => {
        let c = Object.values(colors)[i];
        let R = c[0];
        let G = c[1];
        let B = c[2];
        return { R: R, G: G, B: B };
    });

}

// button events
function reset() {
    colorInput = -1;
    localStorage.setItem('colorInput', colorInput);
}

let buttons = document.querySelectorAll('.btn');
buttons[0].addEventListener('click', reset);