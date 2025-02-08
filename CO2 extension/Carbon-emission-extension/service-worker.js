importScripts('index.js' ,'carbon.js', 'page.service.js');

chrome.commands.onCommand.addListener(async (command) => {
    switch (command) {
        case 'duplicate-tab':
            await duplicateTab();
            break;
        default:
            console.log(`Command ${command} not found`);
    }
});


/**
 * Gets the current active tab URL and opens a new tab with the same URL.
 */
const duplicateTab = async () => {
    const carb = new Carbon();
    const tab = await carb.getActiveTab();

    chrome.tabs.create({ url: tab.url, active: false });
}