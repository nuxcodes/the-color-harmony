function start_control() {
    localStorage.setItem('started', 0);
    let button = document.querySelector('.btn--start');

    button.addEventListener("click", (e) => {
        localStorage.setItem("started", '0');
        console.log("CLICK REGISTERED");
        e.target.href = "/control";
        window.route(e);
    })
}

start_control();

