chrome.runtime.onMessage.addListener(data=> {
    //let {event, task} = data
    if(data.event = 'taskSubmitted'){
        handleTaskSubmit(data.task);
    }
})

let handleTaskSubmit = (task) => {
    console.log("Task received in background.")
    console.log("Task received: ", task)
}