const inputValue = document.querySelector("#user-input"); // Select input field
const addButton = document.querySelector("#add"); // Select button
const chatBox = document.querySelector("#chat-box"); // Select chat area

let messages = []; // Empty array to store messages

addButton.onclick = () => {
    const task = inputValue.value.trim(); // Get input and remove extra spaces

    if (task) {
        messages.push(task); // Add input to the array
        console.log("Messages:", messages); // Print array to console

        // Display message in chat box
        chatBox.innerHTML += `<div class="message user">${task}</div>`;
        
        inputValue.value = ""; // Clear input field
    }
};

