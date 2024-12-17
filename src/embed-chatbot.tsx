import ReactDOM from "react-dom";
import Chatbot from './components/chatbot/ChatBot';
import "./styles/chatbot.css"; // Importa Tailwind CSS


// Crear y montar el contenedor del chat
const createChatbotContainer = () => {
    const container = document.createElement("div");
    container.id = "chatbot-container";
    container.style.position = "fixed";
    container.style.bottom = "20px";
    container.style.right = "20px";
    container.style.zIndex = "9999"; // Asegura que esté siempre encima
    document.body.appendChild(container);

    ReactDOM.render(<Chatbot />, container);
};

// Llamar a la función cuando el script se cargue
createChatbotContainer();
