function results() {

    // console.log(ballController.record);
    let colorOutput = localStorage.getItem('colorOutput').split(',').map((val) => parseInt(val));
    // colorOutput.shift();


    let textItems = document.querySelectorAll('.pane__text--results');

    let count = colorOutput.reduce((pre, cur) => pre + cur, 0);
    let max = colorOutput.reduce((a, b) => Math.max(a, b), -Infinity);
    for (let i = 0; i < 6; i++) {
        textItems[i].appendChild(document.createTextNode(colorTexts[i].replace(colorTexts[i][0], colorTexts[i][0].toUpperCase())));
        textItems[i].appendChild(document.createElement("br"));
        textItems[i].appendChild(document.createTextNode(Math.round(colorOutput[i] / count * 100).toString() + '%'));
        let img = document.createElement("img");
        img.src = "/assets/" + colorTexts[i] + ".png";
        // img.style.display = "block";
        // img.style.position = "relative";
        img.style.width = `${90 * colorOutput[i] / max}%`;
        img.style.height = "auto";
        // img.style.height = "auto";
        let p = document.createElement("p");
        p.className = "pane__blob-text";
        let text = document.createTextNode(colorOutput[i].toString());
        p.appendChild(text);

        document.querySelectorAll(".pane__blob")[i].appendChild(img);
        document.querySelectorAll(".pane__blob")[i].appendChild(p);
    }

    let buttons = document.querySelectorAll('.btn');
    buttons[0].addEventListener("click", (e) => {
        // e.target.href = "/"
        // window.route(e);
        location.href = '/start-control';
    }); buttons[1].addEventListener("click", (e) => {
        // e.target.href = "/control";
        // window.route(e);
        location.href = '/control';
    });

}

results();