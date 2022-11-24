function start_control() {
    let button = document.querySelector('.btn--start');

    button.addEventListener("click", (e) => {
        console.log("CLICK REGISTERED");
        e.target.href = "/control";
        window.route(e);
    })
}

start_control();

