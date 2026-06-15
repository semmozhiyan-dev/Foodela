import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
  constructor() {
    this.client = null;
    this.subscriptions = {};
  }

  connect(onConnect) {
    if (this.client && this.client.connected) {
      console.log('WebSocket already connected');
      return;
    }

    this.client = new Client({
      webSocketFactory: () => new SockJS(import.meta.env.VITE_WS_URL || 'http://localhost:8080/ws'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('✅ WebSocket Connected');
        if (onConnect) onConnect();
      },
      onDisconnect: () => {
        console.log('❌ WebSocket Disconnected');
      },
      onStompError: (frame) => {
        console.error('WebSocket Error:', frame);
      }
    });

    this.client.activate();
  }

  subscribeToOrder(orderId, callback) {
    if (!this.client || !this.client.connected) {
      console.error('WebSocket not connected');
      return null;
    }

    const topic = `/topic/orders/${orderId}`;
    
    // Unsubscribe if already subscribed
    if (this.subscriptions[orderId]) {
      this.subscriptions[orderId].unsubscribe();
    }

    // Subscribe to order updates
    const subscription = this.client.subscribe(topic, (message) => {
      const update = JSON.parse(message.body);
      callback(update);
    });

    this.subscriptions[orderId] = subscription;
    console.log(`📡 Subscribed to order ${orderId}`);

    return subscription;
  }

  unsubscribeFromOrder(orderId) {
    if (this.subscriptions[orderId]) {
      this.subscriptions[orderId].unsubscribe();
      delete this.subscriptions[orderId];
      console.log(`🔌 Unsubscribed from order ${orderId}`);
    }
  }

  disconnect() {
    if (this.client) {
      Object.keys(this.subscriptions).forEach(orderId => {
        this.unsubscribeFromOrder(orderId);
      });
      this.client.deactivate();
      this.client = null;
      console.log('WebSocket disconnected');
    }
  }
}

export default new WebSocketService();
