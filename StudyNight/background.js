chrome.runtime.onMessage.addListener(data=> {
    let {event, task} = data
    if(event == 'taskSubmitted'){
        handleTaskSubmit(task);
    }
})

let handleTaskSubmit = (task) => {
    console.log("Task received in background.");
    console.log("Task received: ", task);
}