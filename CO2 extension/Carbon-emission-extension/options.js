const displayPages = async () => {
    const visitedPages = await PageService.getPages();
    const pageList = document.getElementById('page-list');
    var freq = {};
    var greens = {};
    visitedPages.forEach(page => {
        freq[page.title] = 0;
        greens[page.title] = 0;
    });
    visitedPages.forEach(page => {
        freq[page.title] += parseFloat(page.memory);
        greens[page.title] = page.green;
    });
    var items = Object.keys(freq).map(function(key) {
        return [key, freq[key]];
      });
      
      // Sort the array based on the second element
      items.sort(function(first, second) {
        return second[1] - first[1];
      });
    for (const [key, value] of items) {
        const pageItem = document.createElement('li');
        if(greens[key]) {
            pageItem.className = 'table-row-green';
        }
        else {
            pageItem.className = 'table-row-red';
        }
        pageList.appendChild(pageItem);
        
        const pageLink = document.createElement('a');
        pageLink.className = 'col col-1';
        pageLink.title = key;
        pageLink.innerHTML = key;
        pageLink.href = key;
        pageLink.onclick = async (ev) => {
            ev.preventDefault();
            await chrome.tabs.create({ url: ev.target.href, active: false });
        };
        pageItem.appendChild(pageLink);

        const val = document.createElement('div');
        val.className = 'col col-2';
        val.title = value.toFixed(3);
        val.innerHTML = value.toFixed(3);
        pageItem.appendChild(val);
        const val2 = document.createElement('div');
        val2.className = 'col col-3';
        val2.title = value;
        val2.innerHTML = greens[key];
        pageItem.appendChild(val2);
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    await displayPages();

    // Clear history
    const clearHistoryBtn = document.getElementById('clear-history');
    clearHistoryBtn.onclick = async () => {
        await PageService.clearPages();
        chrome.tabs.reload();
        await displayPages();
    };
    await Carbon.quiet();
});