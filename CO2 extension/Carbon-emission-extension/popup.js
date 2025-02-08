document.addEventListener('DOMContentLoaded', async () => {
    const dialogBox = document.getElementById('dialog-box');
    const dialogBox1 = document.getElementById('dialog-box-1');
    const imgs = document.getElementById('bulb');
    const conf = document.getElementById('confirm');

    const carb = new Carbon();
    const tab = await carb.getActiveTab();
    const bark = carb.getTitle(tab.title);

    dialogBox.innerHTML = bark;
    // Store page.
    const mem = window.performance.memory.usedJSHeapSize;
    const a = new co2.co2;
    const memory = await a.perByte(mem/8).toFixed(3);
    dialogBox1.innerHTML = "CO2 emissions of this page: " + memory + " grams";
    let l = new URL(tab.url);
    //const x = l.hostname;
    imgs.src = "images/bulb1.png";
    conf.innerHTML = "Saving Data...."
    await PageService.savePage(l.hostname, tab.url, memory);
    imgs.src = "images/bulb.png";
    conf.innerHTML = "Saved!!"
});

const settingsBtn = document.getElementById('optOpen');
settingsBtn.onclick = () => {
    chrome.runtime.openOptionsPage();
};