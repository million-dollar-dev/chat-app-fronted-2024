const WEBSOCKET_URL = 'ws://140.238.54.136:8080/chat/chat';

export function createWebSocket(onMessage) {
    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
        console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        onMessage(message);
    };

    socket.onerror = (error) => {
        console.error('WebSocket Error:', error);
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    return socket;
}

export function register(socket, user, password) {
    const registerPayload = {
        "action": "onchat",
        "data": {
            "event": "REGISTER",
            "data": {
                "user": user,
                "pass": password,
            }
        }
    };

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(registerPayload));
    } else {
        socket.addEventListener('open', () => {
            socket.send(JSON.stringify(registerPayload));
        });
    }
}
