console.log("hello back");

tabToBeClosed = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  var mess = JSON.parse(message);
  switch (mess.type) {
    case "create":
      var alarmName = "Alarm" + mess.tabId;
      tabToBeClosed[alarmName] = { tabId: mess.tabId };
      console.log(mess.time);
      chrome.alarms.create(alarmName, { delayInMinutes: parseInt(mess.time) });
      console.log(JSON.stringify(tabToBeClosed));
  }
});

chrome.alarms.onAlarm.addListener(alarm => {
  console.log(alarm);
  if (tabToBeClosed[alarm.name]) {
    chrome.tabs.remove(tabToBeClosed[alarm.name].tabId, () => {
      console.log("tab closed");

      delete tabToBeClosed[alarm.name];
    });
    console.log("Found the alarm on tab" + tabToBeClosed[alarm.name].tabId);
  }
});
