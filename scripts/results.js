import { sculptToMinimalRenderer } from '/shader-park-core.esm.js';
import { spCodeControl } from '/scripts/spCode.js';

const colors = { cyan: [0, 1, 1], red: [1, 0, 0], green: [0, 1, 0], violet: [1, 0, 1], yellow: [1, 1, 0], blue: [0, 0, 1] };
const colorVals = Object.values(colors);
const colorTexts = Object.keys(colors);
let colorInput = localStorage.getItem('colorInput').split(',').map((val) => parseInt(val));
colorInput.shift();

let textItems = document.querySelectorAll('.pane__text--results');

let count = colorInput.reduce((pre, cur) => pre + cur, 0);
for (let i = 0; i < 6; i++) {
    textItems[i].appendChild(document.createTextNode(colorTexts[i]));
    textItems[i].appendChild(document.createElement("br"));
    textItems[i].appendChild(document.createTextNode(Math.round(colorInput[i] / count * 100).toString() + '%'));
}

let buttons = document.querySelectorAll('.btn');
buttons[0].addEventListener("click", (e) => {
    e.target.href = "/"
    window.route(e);
}); buttons[1].addEventListener("click", (e) => {
    e.target.href = "/control";
    window.route(e);
});