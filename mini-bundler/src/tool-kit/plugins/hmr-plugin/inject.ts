export const InjectCode = `
const ws = new WebSocket("ws://localhost:3069");

ws.onmessage = function (event) {
  const message = JSON.parse(event.data);
  if (message.type === "update") {
    window.location.reload();
  }
};
`;
