//ELEMENTS
const taskElement = document.getElementById("tasks")

//BUTTONS
const submitTaskButton = document.getElementById("submitTaskBtn")

submitTaskButton.onclick = () => {
    const task = {
        task1: taskElement.value,
    } 
    chrome.runtime.sendMessage({event: 'taskSubmitted', task})
    displayTask();
}

function displayTask() {
    let dispTask = taskElement.value;
    document.getElementById("task1").innerHTML = dispTask;
    
}

