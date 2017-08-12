var SelectedTab = "tabOnly";

document.addEventListener("DOMContentLoaded", function() {
  setUpListeners();
  startSetUP();
  statusChange("hello");
});

function startSetUP() {
  chrome.tabs.query({ active: true }, tab => {
    var message = {
      type: "setup",
      tabId: tab[0].id
    };
    chrome.runtime.sendMessage(JSON.stringify(message), () => {});
  });
}

function setUpOptionListeners() {
  var elems = document.getElementsByClassName("minList");
  for (var elem in elems) {
    if (!elems.hasOwnProperty(elem)) continue;

    elems[elem].addEventListener("click", e => {
      console.log(e.target.attributes.time.value);
      sendMessage(e.target.attributes.time.value);
    });
  }
}

function setUpListeners() {
  setUpTabListeners();
  setUpOptionListeners();
}

function setUpTabListeners() {
  var elems = document.getElementsByClassName("tabSelector");
  for (var elem in elems) {
    if (!elems.hasOwnProperty(elem)) continue;

    elems[elem].addEventListener("click", e => {
      changeSelectedClass(e.target.attributes.selection.value);

      let tabValue = e.target.attributes.selection.value;
      console.log(e.target.attributes.selection.value);
      SelectedTab = tabValue;
    });
  }
}

function changeSelectedClass(value) {
  console.log(value);
  var elems = document.getElementsByClassName("tabSelector");
  for (var elem in elems) {
    console.log(elems[elem]);
    if (!elems.hasOwnProperty(elem)) continue;
    console.log(
      ` ${elems[elem].attributes.selection.value} and value of ${value}`
    );
    if (elems[elem].attributes.selection.value == value) {
      elems[elem].classList.add("selectedTab");
    } else {
      elems[elem].classList.remove("selectedTab");
    }
  }
}

function sendMessage(time) {
  //var checkedOption = document.querySelector("input[type='radio']:checked");
  switch (SelectedTab) {
    case "tabOnly":
      tabOnly(time);
      break;
    case "allTabs":
      allTabs(time);
      break;
    case "withSound":
      withSound(time);
      break;
  }
}

function tabOnly(time) {
  chrome.tabs.query({ active: true }, tab => {
    var message = {
      type: "create",
      tabId: tab[0].id,
      time: time
    };
    chrome.runtime.sendMessage(JSON.stringify(message), () => {});
  });
}
function allTabs(time) {
  chrome.tabs.query({}, tab => {
    console.log("trying all tabs");
    var message = {
      type: "closeAll",
      tabArray: tab,
      time: time
    };
    chrome.runtime.sendMessage(JSON.stringify(message), () => {});
    console.log("I think I'v send all tabs");
  });
}
function withSound(time) {
  chrome.tabs.query({ audible: true }, tab => {
    console.log("trying all tabs");
    var message = {
      type: "closeWithSound",
      tabArray: tab,
      time: time
    };
    chrome.runtime.sendMessage(JSON.stringify(message), () => {});
    console.log("I think I'v send all tabs");
  });
}

function statusChange(messsage) {
  let statusDiv = document.querySelector("#status");
  statusDiv.innerText = messsage;
}
