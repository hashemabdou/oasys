let messageHistory = [
    { role: 'system', content: 'You are a helpful and supportive mental health therapist.' }
];

async function getChatbotResponse(message) {
    const apiUrl = 'https://shrouded-fjord-22624-f195efef797c.herokuapp.com/api/chat';

    messageHistory.push({ role: 'user', content: message });

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ messages: messageHistory })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Fetch error: ', response.status, response.statusText, errorText);
            return 'Error: Unable to get response from chatbot';
        }

        const data = await response.json();
        const botMessage = data.message;
        messageHistory.push({ role: 'assistant', content: botMessage });

        return botMessage;
    } catch (error) {
        console.error('Error: ', error);
        return 'Error: Unable to communicate with chatbot';
    }
}

function appendMessage(className, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    
    message.split('\n').forEach(line => {
        const paragraph = document.createElement('p');
        paragraph.textContent = line;
        messageElement.appendChild(paragraph);
    });

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    appendMessage('user-message', userInput);
    document.getElementById('user-input').value = '';

    const response = await getChatbotResponse(userInput);
    appendMessage('bot-message', response);
}

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

window.addEventListener('load', () => {
    const welcomeMessage = "Hello! I'm your mental health assistant. How can I help you today?";
    appendMessage('bot-message', welcomeMessage);

    const userInput = document.getElementById('user-input');
    userInput.addEventListener('keydown', handleKeyDown);
});
