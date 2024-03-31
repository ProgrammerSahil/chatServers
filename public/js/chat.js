const PORT = window.location.port;
const socket = io.connect(`http://localhost:${PORT}`);


window.onload = () => {
  connPara = document.getElementById("conn");
  const chatForm = document.getElementById('chat-form');
  const messageInput = document.getElementById('message-input');
  const messageContainer = document.getElementById('message-container');

  chatForm.addEventListener('submit',(e) => {
    e.preventDefault();

    let message = messageInput.value;
    socket.emit('emitMessage', {message, username, room})

    const messageElement = document.createElement('div');
    messageElement.textContent = `You: ${message}`;
    messageContainer.appendChild(messageElement);

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
    let messageElement = document.createElement('div');
    messageElement.textContent = `${data.username}: ${data.message}`;

    messageContainer.appendChild(messageElement);
  });
};
