//XP ELEMENT
let xpElement = 0

//TASK ELEMENTS
const task1Element = document.getElementById("task1")
const task2Element = document.getElementById("task2")
const task3Element = document.getElementById("task3")
const task4Element = document.getElementById("task4")
const task5Element = document.getElementById("task5")

//CHECKBOX ELEMENTS
const check1Element = document.getElementById("checkTask1")
const check2Element = document.getElementById("checkTask2")
const check3Element = document.getElementById("checkTask3")
const check4Element = document.getElementById("checkTask4")
const check5Element = document.getElementById("checkTask5")
const checkboxes = [check1Element, check2Element, check3Element, check4Element, check5Element];


//BUTTONS
const submitTasksButton = document.getElementById("submitTaskBtn")

//BUTTON TO SUBMIT TASKS
submitTasksButton.onclick = () => {
    const tasks = {
        task1: task1Element.value,
        task2: task2Element.value,
        task3: task3Element.value,
        task4: task4Element.value,
        task5: task5Element.value,
    } 
    chrome.runtime.sendMessage({event: 'tasksSubmitted', tasks})
}

//ADDS 100 POINTS FOR TASK CHECKED
function add100(){
    xpElement += 100;
    document.getElementById("XP").innerHTML = xpElement;
    console.log("Current XP: ", xpElement)
}
//TAKES AWAY 100 POINTS FOR TASK UNCHECKED
function sub100() {
    xpElement -= 100;
    document.getElementById("XP").innerHTML = xpElement;
    console.log("Current XP: ", xpElement)
}


function handleCheckboxClick(index) { return () => {
        const checkedEvent = `checked${index + 1}`;
        const uncheckedEvent = `unchecked${index + 1}`;

        if (checkboxes[index].checked) {
            chrome.runtime.sendMessage({ event: checkedEvent });
            add100();
        } else {
            chrome.runtime.sendMessage({ event: uncheckedEvent });
            sub100();
        }
    };
}

checkboxes.forEach((checkbox, index) => {
    checkbox.onclick = handleCheckboxClick(index);
});

//storage
chrome.storage.local.get(["task1","task2","task3","task4","task5"], (result) =>{
	const {task1,task2,task3,task4,task5} = result;
	if (task1){
		task1Element.value = task1
		console.log("task1 value retrieved: ", task1)
	}
	if (task2){
		task2Element.value = task2
		console.log("task2 value retrieved: ", task2)
	}
	if (task3){
		task3Element.value = task3
		console.log("task3 value retrieved: ", task3)
	}
	if (task4){
		task4Element.value = task4
		console.log("task4 value retrieved: ", task4)
		
	}
	if (task5){
		task5Element.value = task5
		console.log("task5 value retrieved: ", task5)
	}
		
})
