document.addEventListener('DOMContentLoaded', function () {
    const chatDisplay = document.getElementById('chat-display');
    const userInput = document.getElementById('user-input');
    let botResponses = {};

    fetch('preguntes.json')
        .then(response => response.json())
        .then(data => {
            botResponses = data;
            window.sendMessage = sendMessage;
            // Mostrar mensaje de bienvenida en negrita
            displayMessage('bot', "¡Hola! Soy tu asistente virtual de SexED+. ¿En qué puedo ayudarte hoy?", 'bold');
        })
        .catch(error => console.error('Error al cargar las respuestas del bot:', error));

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (!userMessage) return;
        userInput.value = ''; 

        // Mostrar mensaje del usuario
        displayMessage('user', userMessage, 'red');

        // Simular tiempo de espera antes de la respuesta del bot (puedes ajustar el tiempo según sea necesario)
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            displayMessage('bot', botResponse, 'bold');
            userInput.value = ''; // Borrar el contenido del input después de enviar el mensaje

            // Scroll to the bottom after new messages are added
            chatDisplay.scrollTop = chatDisplay.scrollHeight;
        }, 3000); // Tiempo de espera en milisegundos (ejemplo: 3000 ms = 3 segundos)
    }

    function displayMessage(sender, message, style) {
        const messageElement = document.createElement('div');
        messageElement.classList.add(sender);
        messageElement.style.fontWeight = style === 'bold' ? 'bold' : 'normal';
        messageElement.textContent = message;
        chatDisplay.appendChild(messageElement);

        // Scroll to the bottom after new messages are added
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }

    function getBotResponse(userMessage) {
        for (const entry of botResponses.preguntes_frequents) {
            if (entry.paraules_clau.some(keyword => userMessage.includes(keyword))) {
                return entry.resposta;
            }
        }
        return "No entiendo la pregunta. Por favor, haz otra pregunta.";
    }
});

// Ajustar márgenes entre el input del usuario y el área de visualización del chat
const userInput = document.getElementById('user-input');
const chatDisplay = document.getElementById('chat-display');

if (userInput && chatDisplay) {
    const marginSize = '10px'; // Ajusta el tamaño del margen según tus preferencias
    userInput.style.marginBottom = marginSize;
    chatDisplay.style.marginTop = marginSize;
}
