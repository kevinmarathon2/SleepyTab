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
    chrome.tabs.query({ active: true }, tab => {
      var message = {
        type: "create",
        tabId: tab[0].id,
        time: time
      };

      chrome.runtime.sendMessage(JSON.stringify(message), () => {});
    });
  }
});
