document.addEventListener("DOMContentLoaded", function () {
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("sendbtn");
    const chatBox = document.getElementById("chat-box");
    const clearChatButton = document.getElementById("clear-chat");

    function addMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);
        messageDiv.innerText = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    async function analyzeText() {
        const comment = userInput.value.trim();
        if (comment === "") return;

        // Display user's message
        addMessage(comment, "user");
        userInput.value = "";

        try {
            const response = await fetch("http://127.0.0.1:8000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: comment })
            });

            if (!response.ok) {
                throw new Error("Failed to fetch toxicity analysis");
            }

            const data = await response.json();

            // Simplified binary response
            if (data.error) {
                addMessage("⚠️ Server Error: " + data.error, "bot");
            } else {
                const toxicityStatus = data.class === "Toxic" 
                    ? "⚠️ Toxic: This text contains inappropriate language." 
                    : "✅ Not Toxic: This text appears to be safe.";
                addMessage(toxicityStatus, "bot");
            }
        } catch (error) {
            console.error("Error:", error);
            addMessage("Error analyzing comment. Please try again.", "bot");
        }
    }

    sendButton.addEventListener("click", analyzeText);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            analyzeText();
        }
    });

    clearChatButton.addEventListener("click", function () {
        // Clear chat but keep the welcome message
        chatBox.innerHTML = '';
        const welcomeMessage = document.createElement("div");
        welcomeMessage.classList.add("message", "bot");
        welcomeMessage.innerText = "Enter any text and this chatbot will detect if there are any foul language.";
        chatBox.appendChild(welcomeMessage);
    });
});