//ELEMENTS
const taskElement = document.getElementbyId("tasks")

//BUTTONS
const submitTaskButton = docuemnt.getElementbyId("submitTaskBtn")

submitTaskButton.onclick = () => {
    const task = {
        Task1: taskElement.value,
    } 
    chrome.runtime.sendMessage({event: "taskSubmitted", task})
}