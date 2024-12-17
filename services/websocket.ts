import { useState, useEffect } from "react";
import { Record } from "../src/types/Record";

// Crear un hook para manejar la conexión WebSocket
export const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    console.log("Connecting to ws");

    // Crear conexión WebSocket
    const ws = new WebSocket(url);

    // Al abrir la conexión
    ws.onopen = () => {
      console.log("Conexión WebSocket establecida");
      setIsConnected(true); // Marca como conectado
    };

    // Al recibir un mensaje
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Mensaje recibido del servidor:", data);
        setMessages((prevMessages) => [...prevMessages, data]); // Actualiza los mensajes
        setRecords(data.records);
      } catch (error) {
        console.error("Error al parsear el mensaje:", error);
      }
    };

    // Manejo de errores
    ws.onerror = (error) => {
      console.error("Error de WebSocket:", error);
      setIsConnected(false); // Si ocurre un error, marcar como desconectado
    };

    // Cuando la conexión se cierre
    ws.onclose = () => {
      console.log("Conexión WebSocket cerrada");
      setIsConnected(false); // Marca como desconectado
    };

    // Al establecer la conexión, guarda la referencia del WebSocket
    setSocket(ws);

    // Cleanup (cuando el componente se desmonte o actualice)
    return () => {
      console.log("Cerrando WebSocket");
      if (ws.readyState === WebSocket.OPEN) {
        ws.close(); // Cierra la conexión solo si está abierta
      }
    };
  }, [url]);

  // Función para enviar mensajes
  const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message }));
    } else {
      console.log("WebSocket no está abierto");
    }
  };

  return {
    socket,
    messages,
    records,
    isConnected,
    sendMessage,
  };
};
