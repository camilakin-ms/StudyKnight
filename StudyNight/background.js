let xp;
if (!xp || xp.trim() === "") {
    xp = 0;
}

function sendXP(){
    chrome.runtime.sendMessage({ action: "updateXP", xp });
}
//chrome.storage.local.set(xp)

const ALARM_JOB_NAME = "CHECK_ALARM"

const createAlarm = () => {
	chrome.alarms.create(ALARM_JOB_NAME, {periodInMinutes: 1.0 })
}
const stopAlarm = () => {
	chrome.alarms.clearAll()
}

//i have tabTitel and tabUrl
function queeryTabs(callback){
	let queryOptions = {active: true, lastFocusedWindow: true};
	
	chrome.tabs.query(queryOptions, (tabs) => {
		if (chrome.runtime.lastError) {
			console.error(chrome.runtime.lastError);
			callback(null);
			return;
		}
		
		if(tabs && tabs.length > 0) {
			const activeTab = tabs[0];
        		const tabTitle = activeTab.title;
        		const tabUrl = activeTab.url;
        		
        	
        	console.log("Active Tab Title: ", tabTitle);
        	console.log("Active Tab URL: ", tabUrl);
        	callback({ title: tabTitle, url: tabUrl });
        	}else{
        		console.error("no tab found");
        		callback(null);
        		}
	});
}
//predefined url's
const linksList = [
	"https://www.youtube.com/",
	"https://www.facebook.com/"
	];

chrome.alarms.onAlarm.addListener(() => {
	console.log("onAlarm schedule code running...")
	queeryTabs((tabInfo) => {
		if(tabInfo) {
			console.log("T'sss")
			const tabTitle = tabInfo.title;
      			const tabUrl = tabInfo.url; 
      			
      			const isMatch = linksList.includes(tabUrl);
      			
      			if (isMatch) {
      				console.log("URL matched with predefined URL: ", tabUrl);
                    xp += 1
                    chrome.storage.local.set(xp)
    			} else {
     				 console.log("URL did not match any predefined URL.");
    				} 
		}else{
			console.log("NO T")
		}
	});
});



chrome.runtime.onMessage.addListener(data=> { //listens to submit tasks button
    let {event, tasks} = data
    if(event == 'tasksSubmitted'){
        handleTaskSubmit(tasks);
    }
})

let handleTaskSubmit = (tasks) => { //logs tasks input upon button pressed
    console.log("Tasks received in background.");
    console.log("Tasks received: ", tasks);
    chrome.storage.local.set(tasks)
    createAlarm();
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

//clear task data
function clearData() {
  const keysToRemove = ["task1", "task2", "task3", "task4", "task5"];
  
  chrome.storage.local.remove(keysToRemove, () => {
    console.log("Data cleared from chrome.storage.local:", keysToRemove);
    
    // Optionally, you can also update the input fields to clear their values
    task1Element.value = "";
    task2Element.value = "";
    task3Element.value = "";
    task4Element.value = "";
    task5Element.value = "";
  });
}


