document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const chatContainer = document.querySelector(".chat-container");
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("sendbtn");
    const clearButton = document.getElementById("clear-chat");
    
    // Initialize the app
    function initApp() {
        // Focus input on load
        userInput.focus();
        
        // Add welcome message with a slight delay
        setTimeout(() => {
            addBotMessage("👋 Welcome to ToxiScan! I can analyze text for potentially toxic content. Type any message to get started.");
        }, 500);
    }
    
    // Auto-resize textarea as user types
    userInput.addEventListener("input", function() {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
        
        // Reset height if empty
        if (this.value === "") {
            this.style.height = "auto";
        }
    });
    
    // Placeholder for Hugging Face toxicity analysis
    // This will be replaced with actual API integration
    function analyzeToxicity(text) {
        // Placeholder for Hugging Face API call
        // In production, replace with actual API call
        
        // For demonstration, we'll use a simple random score
        const toxicityScore = Math.random();
        
        // Determine toxicity level and color based on score
        let toxicityLevel, color;
        
        if (toxicityScore >= 0.7) {
            toxicityLevel = "High";
            color = "#f44336"; // Red
        } else if (toxicityScore >= 0.3) {
            toxicityLevel = "Medium";
            color = "#ff9800"; // Orange
        } else {
            toxicityLevel = "Low";
            color = "#4caf50"; // Green
        }
        
        return {
            text: text,
            toxicityScore: toxicityScore.toFixed(2),
            toxicityLevel: toxicityLevel,
            color: color
        };
    }
    
    // Function to add user message
    function addUserMessage(content) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", "user");
        messageDiv.textContent = content;
        chatBox.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Function to add bot message
    function addBotMessage(content, customStyle = null) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", "bot");
        messageDiv.textContent = content;
        
        // Apply custom styles if provided
        if (customStyle) {
            Object.keys(customStyle).forEach(property => {
                messageDiv.style[property] = customStyle[property];
            });
        }
        
        chatBox.appendChild(messageDiv);
        scrollToBottom();
        
        // Add typing animation effect
        messageDiv.style.opacity = "0";
        messageDiv.style.transform = "translateY(10px)";
        
        setTimeout(() => {
            messageDiv.style.opacity = "1";
            messageDiv.style.transform = "translateY(0)";
        }, 100);
        
        return messageDiv;
    }
    
    // Function to add analysis result
    function addAnalysisResult(analysis) {
        const resultDiv = document.createElement("div");
        resultDiv.classList.add("message", "bot", "result");
        
        // Create formatted result
        const resultContent = `📊 Analysis Results:
┌─────────────────────────────┐
│ Toxicity Score: ${analysis.toxicityScore}/1.00     │
│ Toxicity Level: ${analysis.toxicityLevel.padEnd(12)}│
└─────────────────────────────┘`;
        
        resultDiv.textContent = resultContent;
        resultDiv.style.borderLeft = `5px solid ${analysis.color}`;
        
        chatBox.appendChild(resultDiv);
        scrollToBottom();
    }
    
    // Scroll chat to bottom
    function scrollToBottom() {
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    // Process user input and generate response
    function processInput() {
        const text = userInput.value.trim();
        if (text === "") return;
        
        // Add user message
        addUserMessage(text);
        
        // Clear and reset input field
        userInput.value = "";
        userInput.style.height = "auto";
        userInput.focus();
        
        // Show typing indicator
        const typingIndicator = addBotMessage("Analyzing message...");
        
        // Simulate processing delay
        setTimeout(() => {
            // Remove typing indicator
            chatBox.removeChild(typingIndicator);
            
            // Analyze toxicity - this will be replaced with Hugging Face integration
            const analysis = analyzeToxicity(text);
            
            // Add response message
            addBotMessage("I've analyzed your message for potential toxicity:");
            
            // Add the analysis result with slight delay
            setTimeout(() => {
                addAnalysisResult(analysis);
                
                // Add follow-up message
                setTimeout(() => {
                    let followup;
                    
                    if (analysis.toxicityLevel === "High") {
                        followup = "This message contains content that may be considered highly toxic. Please consider more respectful language.";
                    } else if (analysis.toxicityLevel === "Medium") {
                        followup = "This message contains some potentially concerning language. Consider if there are more constructive ways to express this.";
                    } else {
                        followup = "This message appears to be non-toxic. Type another message to analyze more content.";
                    }
                    
                    addBotMessage(followup);
                }, 500);
            }, 300);
        }, 1200);
    }
    
    // Clear chat history
    function clearChat() {
        // Remove all messages except the first welcome message
        while (chatBox.children.length > 1) {
            chatBox.removeChild(chatBox.lastChild);
        }
        
        // If no welcome message exists, add one
        if (chatBox.children.length === 0) {
            addBotMessage("Chat history cleared. Type a message to analyze it for toxicity.");
        }
    }
    
    // Event Listeners
    sendButton.addEventListener("click", processInput);
    
    userInput.addEventListener("keydown", function(event) {
        // Send message with Enter, allow Shift+Enter for new line
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            processInput();
        }
    });
    
    clearButton.addEventListener("click", clearChat);
    
    // Initialize the app
    initApp();
});