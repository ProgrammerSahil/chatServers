const PORT = window.location.port;
const socket = io.connect(`http://localhost:${PORT}`);

window.onload = () => {
    connPara = document.getElementById("conn");

    socket.on('userConn', message => {
        connPara.style.visibility = "visible";
        connPara.innerHTML = message;
        setTimeout(() => {
            connPara.style.visibility = "hidden";
        }, 3000)
});

socket.on('message', message => {
    console.log(message);
});
};

