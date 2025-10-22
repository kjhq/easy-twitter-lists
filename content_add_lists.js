let listsHTML = "\n";
let lastLists = null

async function addListsTab() {
    const userActions = document.querySelector('button[data-testid="userActions"]');
    let lists = {}
    let isMember = []

    if (!userActions) {
        console.log('userActions button not found');
        return;
    }

    const listElement = document.querySelector('.add-to-list-container');
    if (listElement) {
        return;
    }

    // Properly await the async operations
    try {
        let memberID = document.querySelector('button[data-testid*="follow"').getAttribute("data-testid").split("-")[0]

        // Fetch both lists and member status in parallel
        const [lists, memberLists] = await Promise.all([
            chrome.runtime.sendMessage({ lists: true }),
            chrome.runtime.sendMessage({ memberID: memberID })
        ]);

        console.log('Member lists:', memberLists);

        // Always regenerate the HTML with fresh data
        listsHTML = "\n";
        for (const list in lists) {
            if (memberLists && memberLists.includes(list)) {
                listsHTML += `<button class="selected" list-id='${lists[list]}' member-id='${memberID}'>${list}</button>\n`;
            } else {
                listsHTML += `<button list-id='${lists[list]}' member-id='${memberID}'>${list}</button>\n`;
            }
        }
        lastLists = lists;

        userActions.insertAdjacentHTML("beforebegin", html);
        const dropdownBtn = document.querySelector(".add-to-list-container");

        if (dropdownBtn) {
            initializeDropdown(dropdownBtn, listsHTML);
        }
    } catch (error) {
        console.error('Error fetching lists:', error);
    }
}