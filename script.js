const inputValue = document.querySelector("#user-input"); 
const addButton = document.querySelector("#add");
const chatBox = document.querySelector("#chat-box");

let messages = [];

addButton.onclick = () => {
    const task = inputValue.value.trim();

    if (task) {
        messages.push(task);
        console.log("Messages:", messages);

        // Display message in chat box
        chatBox.innerHTML += `<div class="message user">${task}</div>`;
        
        inputValue.value = ""; // Clear input field
    }
};

