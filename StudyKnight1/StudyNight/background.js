const ALARM_JOB_NAME = "CHECK_ALARM"
chrome.runtime.onMessage.addListener(data=> {
    let {event, task} = data
    if(event == 'taskSubmitted'){
        handleTaskSubmit(task);
    }
})

// when the alarm is on. dictated by the timer it will check

let handleTaskSubmit = (task) => {
    console.log("Task received in background.");
    console.log("Task received: ", task);
    chrome.storage.local.set(task)
    createAlarm();
}

const createAlarm = () => {
	chrome.alarms.create(ALARM_JOB_NAME, {periodInMinutes: 1.0 })
}
const stopAlarm = () => {
	chrome.alarms.clearAll()
}
chrome.alarms.onAlarm.addListener(() => {
	console.log("onAlarm schedule code running...")
	let queryOptions = {active: true, lastFocusedWindow: true};
	
	chrome.tabs.query(queryOptions, (tabs) => {
		if (chrome.runtime.lastError) {
			console.error(chrome.runtime.lastError);
			return;
		}
		
		if(tabs && tabs.length > 0) {
			const activeTab = tabs[0];
        		const tabTitle = activeTab.title;
        		const tabUrl = activeTab.url;
        		
        	
        	console.log("Active Tab Title: " + tabTitle);
        	console.log("Active Tab URL: " + tabUrl);
        	
        	}else {
        		console.error(" no tab found");
        		}
        	
	
	})
})
