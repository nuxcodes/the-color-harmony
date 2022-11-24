function control() {
    function reset() {
        colorInput = [-1, 0, 0, 0, 0, 0, 0];
        localStorage.setItem('colorInput', colorInput);
        localStorage.setItem('agent', 1);
    }

    let tiles = document.querySelectorAll('.tiles');
    let canvas = [];
    let colorInput;
    reset();

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
            colorInput[0] = i;
            colorInput[i + 1] += 1;
            localStorage.setItem('colorInput', colorInput);
            localStorage.setItem('agent', 1);
        });

        // create text
        let p = document.createElement("p");
        p.className = "color--label";
        p.style.zIndex = 100;
        let text = document.createTextNode(colorTexts[i].replace(colorTexts[i][0], colorTexts[i][0].toUpperCase()));
        tile.appendChild(p);
        p.appendChild(text);

        // render blobs
        window.sculptToMinimalRenderer(canva, window.spCodeControl, () => {
            let c = Object.values(colors)[i];
            let R = c[0];
            let G = c[1];
            let B = c[2];
            return { R: R, G: G, B: B };
        });
    }
    // button events
    let buttons = document.querySelectorAll('.btn');
    buttons[0].addEventListener('click', reset);
    buttons[1].addEventListener('click', (e) => {
        e.target.href = "/results";
        window.route(e);
    });
}

control();


