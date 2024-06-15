class WebSocketService {
    constructor() {
        this.socket = null;
    }

    connect(url) {
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        this.socket.onmessage = (message) => {
            console.log('Received message:', message.data);
        };

        this.socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    send(data) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        }
    }
}

const websocketService = new WebSocketService();
export default websocketService;