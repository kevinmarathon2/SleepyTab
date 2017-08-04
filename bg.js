console.log("hello back");

tabToBeClosed = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  var mess = JSON.parse(message);
  console.log(sender);
  console.info;
  switch (mess.type) {
    case "create":
      var alarmName = "Alarm" + mess.tabId;
      tabToBeClosed[alarmName] = { tabId: mess.tabId };
      console.log(mess.time);
      chrome.alarms.create(alarmName, { delayInMinutes: parseInt(mess.time) });
      console.log(JSON.stringify(tabToBeClosed));
      break;
    case "setup":
      if (tabToBeClosed[mess.tabId] != null) {
        var AlarmSet = "AlarmSet";
        chrome.runtime.sendMessage(JSON.stringify(AlarmSet), () => {});
      }
      break;
    case "closeAll":
      mess.tabArray.forEach(tab => {
        var alarmName = "Alarm" + tab.id;
        tabToBeClosed[alarmName] = { tabId: tab.id };
        chrome.alarms.create(alarmName, {
          delayInMinutes: parseInt(mess.time)
        });
      });
      break;
    case "closeWithSound":
      mess.tabArray.forEach(tab => {
        var alarmName = "Alarm" + tab.id;
        tabToBeClosed[alarmName] = { tabId: tab.id };
        chrome.alarms.create(alarmName, {
          delayInMinutes: parseInt(mess.time)
        });
      });
      break;
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
