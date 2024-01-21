
let xp; // Declare the variable
// Check if xp is undefined or empty (empty string)
if (typeof xp === "undefined" || xp === "") {
    xp = 0; // Set it to zero
}
let level;
if (typeof level === "undefined" || level === "") {
    level = 1; // Set it to zero
}

function sendXP(){
    chrome.runtime.sendMessage({ action: "updateXP", xp });
    if(xp < 0){
        xp = 0;
    }
    if(xp >= 250){
        level += 1;
        console.log("level logged", level);
        xp = xp - 250;
        chrome.notifications.create({
            title:"level up notify",
            message: `You Have Leveled UP! Your new level: ${level}`,
            iconUrl: "./images/smile-big.png",
            type: "basic"
       })
        
    }
    let updatedXp = xp;
    chrome.storage.local.set({xp: updatedXp});
    
}
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
"https://www.concordia.ca/",
    "https://concordia.udemy.com/organization/home/",
    "https://en.wikipedia.org/wiki/Main_Page",
    "https://library.concordia.ca/",
    "https://scholar.google.com/",
    "https://ca.linkedin.com/",
    "https://www.jstor.org/",
    "https://moodle.concordia.ca/moodle/?redirect=0",
    "https://github.com/dashboard",
    "https://www.khanacademy.org/",
    "https://www.canva.com/",
    "https://docs.google.com/",
    "https://drive.google.com/",
    "https://www.duolingo.com/",
    "https://webwork.concordia.ca/",
    "https://www.mathway.com",
    "https://www.symbolab.com",
    "https://www.integral-calculator.com",
    "https://archive.org",
    "https://mail.google.com/",
    "https://calendar.google.com/"
	];

chrome.alarms.onAlarm.addListener(() => {
	console.log("onAlarm schedule code running...")
	queeryTabs((tabInfo) => {
		if(tabInfo) {
			console.log("T'sss")
			const tabTitle = tabInfo.title;
      			const tabUrl = tabInfo.url; 
      			
      			const isMatch = linksList.some(predefinedUrl => tabUrl.includes(predefinedUrl));
      			
      			if (isMatch) {
      				console.log("URL matched with predefined URL: ", tabUrl);
                    xp += 1;
                    sendXP()
                    
    			} else {
     				 console.log("URL did not match any predefined URL.");
    				} 
		}else{
			console.log("NO T")
		}
	});
});

function clear(){
    chrome.storage.local.clear(function() {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            console.log("All data in chrome.storage cleared successfully.");
        }
    });
    

}

chrome.runtime.onMessage.addListener(ndata => {
    let {event} = ndata
    if(event == 'resetClick'){
        //console.log("Reset Clicked")
        clear();
        //clearData();
        //clearData();
    }
    if(event == 'restClick'){
        handleRest();
    }

})

let handleRest = () => {
    console.log("Rest Active")
    stopAlarm();
}

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
        xp += 100;
        sendXP();
    }
    if(data.event === 'unchecked1'){
        console.log("checklist 1 IS UNCHECKED")
        xp -= 100;
        sendXP();
    }
    if(data.event === 'checked2'){
        console.log("checklist 2 IS CHECKED")
        xp += 100;
        sendXP();
    }
    if(data.event === 'unchecked2'){
        console.log("checklist 2 IS UNCHECKED")
        xp -= 100;
        sendXP();
    }
    if(data.event === 'checked3'){
        console.log("checklist 3 IS CHECKED")
        xp += 100;
        sendXP();
    }
    if(data.event === 'unchecked3'){
        console.log("checklist 3 IS UNCHECKED")
        xp -= 100;
        sendXP();
    }
    if(data.event === 'checked4'){
        console.log("checklist 4 IS CHECKED")
        xp += 100;
        sendXP();
    }
    if(data.event === 'unchecked4'){
        console.log("checklist 4 IS UNCHECKED")
        xp -= 100;
        sendXP();
    }
    if(data.event === 'checked5'){
        console.log("checklist 5 IS CHECKED")
        xp += 100;
        sendXP();
    }
    if(data.event === 'unchecked5'){
        console.log("checklist 5 IS UNCHECKED")
        xp -= 100;
        sendXP();
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
//clear points


