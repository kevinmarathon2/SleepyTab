document.addEventListener("DOMContentLoaded", function() {
  var elems = document.getElementsByClassName("minList");
  for (var elem in elems) {
    if (!elems.hasOwnProperty(elem)) continue;

    elems[elem].addEventListener("click", e => {
      console.log(e.target.attributes.time.value);
      sendMessage(e.target.attributes.time.value);
    });
  }

  function sendMessage(time) {
    var checkedOption = document.querySelector("input[type='radio']:checked");
    switch (checkedOption.value) {
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

  (function startSetUP() {
    chrome.tabs.query({ active: true }, tab => {
      var message = {
        type: "setup",
        tabId: tab[0].id
      };
      chrome.runtime.sendMessage(JSON.stringify(message), () => {});
    });
  })();
});
