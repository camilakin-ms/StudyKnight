chrome.runtime.onMessage.addListener(data=> { //listens to submit tasks button
    let {event, tasks} = data
    if(event == 'tasksSubmitted'){
        handleTaskSubmit(tasks);
    }
})

let handleTaskSubmit = (tasks) => { //logs tasks input upon button pressed
    console.log("Tasks received in background.");
    console.log("Tasks received: ", tasks);
}

chrome.runtime.onMessage.addListener(data => { //listens to checkboxes
    if(data.event === 'checked1'){
        console.log("checklist 1 IS CHECKED")
    }
    if(data.event === 'unchecked1'){
        console.log("checklist 1 IS UNCHECKED")
    }
    if(data.event === 'checked2'){
        console.log("checklist 2 IS CHECKED")
    }
    if(data.event === 'unchecked2'){
        console.log("checklist 2 IS UNCHECKED")
    }
    if(data.event === 'checked3'){
        console.log("checklist 3 IS CHECKED")
    }
    if(data.event === 'unchecked3'){
        console.log("checklist 3 IS UNCHECKED")
    }
    if(data.event === 'checked4'){
        console.log("checklist 4 IS CHECKED")
    }
    if(data.event === 'unchecked4'){
        console.log("checklist 4 IS UNCHECKED")
    }
    if(data.event === 'checked5'){
        console.log("checklist 5 IS CHECKED")
    }
    if(data.event === 'unchecked5'){
        console.log("checklist 5 IS UNCHECKED")
    }
})
