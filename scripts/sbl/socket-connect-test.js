import ws from "k6/ws";
import { check } from "k6";
const ip = "192.168.1.104";
const port = "8082";
export default function () {
  const url = `ws://${ip}:${port}/chat/test/test`;
  const params = { tags: { my_tag: "hello" } };
  const res = ws.connect(url, params, function (socket) {
    socket.on("open", () => console.log("connected"));
    socket.on("message", (data) => console.log("Message received: ", data));
    socket.on("close", () => console.log("disconnected"));
  });
  check(res, { "status is 101": (r) => r && r.status === 101 });
}