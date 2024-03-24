const PORT = window.location.port;
const socket = io.connect(`http://localhost:${PORT}`);


window.onload = () => {
  connPara = document.getElementById("conn");
  const chatForm = document.getElementById('chat-form');
  const messageInput = document.getElementById('message-input');
  const messageContainer = document.getElementById('message-container');

  chatForm.addEventListener('submit',(e) => {
    e.preventDefault();
    console.log(1);

    const message = messageInput.value;

    socket.emit('emitMessage', {message, username, room})
    messageInput.value = '';
  })

  socket.on("userConn", (message) => {
    connPara.style.visibility = "visible";
    connPara.innerHTML = message;
    setTimeout(() => {
      connPara.style.visibility = "hidden";
    }, 3000);
  });

  socket.on("message", (data) => {
    console.log(data.message);
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.username}: ${data.message}`;

    messageContainer.appendChild(messageElement);
  });
};
