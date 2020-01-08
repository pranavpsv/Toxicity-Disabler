document.querySelector("button").addEventListener("click", () => {
    chrome.tabs.executeScript(null, {file: "tfjs.js"}, () => {
        chrome.tabs.executeScript(null, {file: "toxicity.js"}, () => {
            chrome.tabs.executeScript(null, {file: "content.js"});
        });
    });
});
