import * as io from "socket.io-client";

class WebSockets {
    socket: SocketIOClient.Socket | undefined;

    init(): void {
        this.socket = io.connect("http://localhost:4000");
    }
}

const webSockets = new WebSockets();

export function getSocket(): SocketIOClient.Socket {
    return webSockets.socket!;
}

export function initSocket(): void {
    webSockets.init()
}