// Replace 'your-iframe-id' with the actual ID of your iframe element
function enableInputsInIframe(tab) {
  chrome.scripting.executeScript({
    target: {
      tabId: tab.id,
    },
    func: () => {
      var iframe = document.getElementById("contentIframe");
      if (iframe) {
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        var inputs = iframeDoc.getElementsByTagName("input");
        var selects = iframeDoc.getElementsByTagName("select");

        for (var i = 0; i < inputs.length; i++) {
          inputs[i].removeAttribute("disabled");
        }
        for (var i = 0; i < selects.length; i++) {
          selects[i].removeAttribute("disabled");
        }
      } else {
        var inputs = document.getElementsByTagName("input");
        var selects = document.getElementsByTagName("select");

        for (var i = 0; i < inputs.length; i++) {
          inputs[i].removeAttribute("disabled");
        }
        for (var i = 0; i < selects.length; i++) {
          selects[i].removeAttribute("disabled");
        }
      }
    },
  });
}

// Replace 'your-iframe-id' with the actual ID of your iframe element
function enableInputsInCurrentTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length > 0) {
      enableInputsInIframe(tabs[0]);
    }
  });
}

chrome.action.onClicked.addListener(enableInputsInCurrentTab);
