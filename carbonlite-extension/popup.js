document.getElementById("analyze").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => chrome.runtime.sendMessage({ action: "analyze_page" })
        });
    });
});

document.getElementById("optimize").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => chrome.runtime.sendMessage({ action: "optimize_page" })
        });
    });
});
