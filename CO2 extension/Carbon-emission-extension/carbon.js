/** Shared logic */
class Carbon {

    /**
     * Gets the active Tab
     * @returns {Promise<*>} Active tab
     */
    getActiveTab = async () => {
        const query = { active: true, currentWindow: true };
        const tabs = await chrome.tabs.query(query);
        
        return tabs[0];
    }

    /**
     * @param {String} tabTitle Current tab title
     * @returns {String} 
     */
    getTitle = (tabTitle) => {
        const Title = `Currently at: <br><b>${tabTitle}</b>`
        return Title;
    }

    /**
     * Hide the browser action badge.
     * @returns {Promise<void>}
     */
    static quiet = async () => {
        await chrome.action.setBadgeText({ text: '' });
    }
}