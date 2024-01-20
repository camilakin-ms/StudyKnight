//ELEMENTS
const taskElement = document.getElementbyId("tasks")

//BUTTONS
const submitTaskButton = document.getElementbyId("submitTaskBtn")

submitTaskButton.onclick = () => {
    const task = {
        task1: taskElement.value,
    } 
    chrome.runtime.sendMessage({event: 'taskSubmitted', task})
}