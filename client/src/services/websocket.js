import eventManager from './eventManager';

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

            this.socket.onmessage = (message) => {
                const response = JSON.parse(message.data);
                console.log('Nhận được response', response);
                eventManager.emit(response.event, response);
            };
        }
    }

    send(data) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            // this.connect('ws://140.238.54.136:8080/chat/chat');
            console.log('disconnected')
        }
    }

    on(event, callback) {
        eventManager.on(event, callback);
    }

    off(event, callback) {
        eventManager.off(event, callback);
    }
}

const websocketService = new WebSocketService();
export default websocketService;
