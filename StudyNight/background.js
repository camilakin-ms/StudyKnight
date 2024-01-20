chrome.runtime.onMessage.addListener(data=> {
    let {event, tasks} = data
    if(event == 'tasksSubmitted'){
        handleTaskSubmit(tasks);
    }
})

let handleTaskSubmit = (tasks) => {
    console.log("Task received in background.");
    console.log("Task received: ", tasks);
}