//TASK ELEMENTS
const task1Element = document.getElementById("task1")
const task2Element = document.getElementById("task2")
const task3Element = document.getElementById("task3")
const task4Element = document.getElementById("task4")
const task5Element = document.getElementById("task5")

//BUTTONS
const submitTasksButton = document.getElementById("submitTaskBtn")

submitTasksButton.onclick = () => {
    const tasks = {
        task1: task1Element.value,
        task2: task2Element.value,
        task3: task3Element.value,
        task4: task4Element.value,
        task5: task5Element.value,
    } 
    chrome.runtime.sendMessage({event: 'tasksSubmitted', tasks})
    displayTasks();
}

function displayTasks() {
    let dispTask1 = task1Element.value;
    let dispTask2 = task2Element.value;
    let dispTask3 = task3Element.value;
    let dispTask4 = task4Element.value;
    let dispTask5 = task5Element.value;
    document.getElementById("task1").innerHTML = createElement("p");
    document.getElementById("task2").innerHTML = dispTask2;
    document.getElementById("task3").innerHTML = dispTask3;
    document.getElementById("task4").innerHTML = dispTask4;
    document.getElementById("task5").innerHTML = dispTask5;
}