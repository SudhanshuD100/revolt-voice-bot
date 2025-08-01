let socket;
let mediaRecorder;

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

startBtn.addEventListener("click", async () => {
  // Connect to backend WebSocket
  socket = new WebSocket("ws://localhost:3000");

  socket.onopen = async () => {
    console.log("✅ Connected to backend");

    // Ask for mic access
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });

    mediaRecorder.start(250); // send every 250ms

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
        event.data.arrayBuffer().then((buffer) => {
          socket.send(buffer);
        });
      }
    };

    // Play AI response
    socket.onmessage = async (event) => {
      const audioBlob = new Blob([event.data], { type: "audio/wav" });
      const audioURL = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioURL);
      audio.play();
    };

    startBtn.disabled = true;
    stopBtn.disabled = false;
  };
});

stopBtn.addEventListener("click", () => {
  mediaRecorder.stop();
  socket.close();
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
