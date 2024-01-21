//XP ELEMENT
let xpElement = document.getElementById("XP")

chrome.runtime.onMessage.addListener(data => {
    let {action,xp} = data;
    if (action === "updateXP"){
        let xPoints = xp;
        console.log("Updated xp points: ", xPoints)
        xpElement.innerHTML = xPoints;
        
    }
})

chrome.storage.local.get("xp", function(data) {
    const xpValue = data.xp !== undefined ? data.xp : 0;
    xpElement.textContent = xpValue
    console.log("xp loaded", data.xp);
})



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
const resetButton = document.getElementById("reset")
const restButton = document.getElementById("rest")

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

resetButton.onclick = () => {
    chrome.runtime.sendMessage({event: 'resetClick'})
}
restButton.onclick = () =>  {
    chrome.runtime.sendMessage({event: 'restClick'})
}



function handleCheckboxClick(index) { return () => { //sends message to background.js for checked/unchecked boxes
        const checkedEvent = `checked${index + 1}`;
        const uncheckedEvent = `unchecked${index + 1}`;
        const isChecked = checkboxes[index].checked;

        if (isChecked) {
            chrome.runtime.sendMessage({ event: checkedEvent });
        } else {
            chrome.runtime.sendMessage({ event: uncheckedEvent });
        }
        const boxState = {};
        boxState[index] = isChecked;
        chrome.storage.local.set(boxState);
    };
}

checkboxes.forEach((checkbox, index) => {
    checkbox.onclick = handleCheckboxClick(index);
});

chrome.storage.local.get(null, function(data) {
    Object.entries(data).forEach(([index, value]) => {
        if (checkboxes[index]) {
            checkboxes[index].checked = value;
        }
    });
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
