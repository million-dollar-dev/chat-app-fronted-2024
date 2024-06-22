class WebSocketService {
    constructor() {
        this.socket = null;
    }

    connect(url) {
        if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
            this.socket = new WebSocket(url);

            this.socket.onopen = () => {
                console.log('WebSocket connected');
            };

            this.socket.onclose = () => {
                this.connect(url);
            };

            this.socket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        }
    }

    send(data) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            console.error('WebSocket is not connected');
        }
    }

    onMessage(callback) {
        if (this.socket) {
            this.socket.onmessage = (message) => {
                callback(JSON.parse(message.data));
            };
        } else {
            console.error('WebSocket is not initialized');
        }
    }
}

const websocketService = new WebSocketService();
export default websocketService;
