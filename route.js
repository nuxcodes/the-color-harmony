// import { control } from './scripts/control.js';

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
}

const routes = {
    "/": "index.html",
    "/control": "./pages/control.html",
    "/results": "./pages/results.html",
    "/display": "./pages/display.html",
    "/start-control": "./pages/start-control.html",
};

let script;

const insertScript = async (url) => {
    console.log("SCRIPT LOADED." + url);
    const html = await fetch('/scripts/' + url).then((data) => data.text());
    script = document.createRange().createContextualFragment(`<script class="a${Date.now()}" type='module' defer>` + html + "</script>");
    // const script = document.createRange().createContextualFragment(`<script class="a${Date.now()}" src="/scripts/${url}" type='module' defer>` + "</script>");
    // script = document.createElement('script');
    // script.src = '/scripts/' + url;
    script.type = 'module';
    script.defer = true;
    document.querySelector("#main-page").appendChild(script);
}

const handleLocation = async () => {
    const path = window.location.pathname;
    if (path === '/index.html') {
        path = '/';
    }
    console.log(path);
    const route = routes[path];
    const html = await fetch(route).then((data) => data.text());
    // script = document.querySelector("#main-page>script");
    // if (script) {
    //     console.log("Script removed." + script.src);
    //     script.parentNode.removeChild(script);
    // }
    document.getElementById("main-page").innerHTML = html;
    // location.reload();
    console.log("CURRENT PATH:::" + path);
    switch (path) {
        case "/display":
            await insertScript('display.js')
            break;
        case "/control":
            await insertScript('control.js')
            break;
        case "/results":
            await insertScript('results.js')
            break;
        case "/start-control":
            await insertScript('start-control.js')
            break;
        default:
            break;
    }
}


window.addEventListener('locationchange', handleLocation);
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        handleLocation();
    }
});
window.onpopstate = handleLocation;
window.route = route;
window.onpopstate();

