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
};


function insertScript(url) {
    {
        let script = document.createElement('script');
        script.src = '/scripts/' + url;
        script.type = 'module';
        document.getElementById("main-page").appendChild(script);
    }
}

const handleLocation = async () => {
    const path = window.location.pathname;
    if (path === '/index.html') {
        path = '/';
    }
    console.log(path);
    const route = routes[path];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
    switch (path) {
        case "/display":
            insertScript('display.js')
            break;
        case "/control":
            insertScript('control.js')
            break;
        case "/results":
            insertScript('results.js')
            break;
        default:
            break;
    }
}

function routeHref(e, className, loc) {
    if (!e.target.parentNode.matches(className)) {
        return;
    }
    e.target.href = loc;
    e.preventDefault();
    route(e);
}

window.addEventListener('locationchange', handleLocation);
window.onpopstate = handleLocation;
window.route = route;
handleLocation();

document.addEventListener("click", (e) => {
    routeHref(e, '.btn--control-results', '/results');
});