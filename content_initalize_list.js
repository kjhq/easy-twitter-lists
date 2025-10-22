let dropdownMenuElement = null;
let itemsEventListeners = []

function initializeDropdown(dropdownBtn, listsHTML) {
    const thirdParent = dropdownBtn.parentElement?.parentElement?.parentElement?.parentElement;

    console.log('Initializing dropdown', { dropdownBtn, thirdParent });
    if (!dropdownBtn || !thirdParent) {
        console.error('Dropdown elements not found!');
        return;
    }

    // If dropdown menu exists, delete it and all its event listeners
    if (dropdownMenuElement) {
        dropdownMenuElement.innerHTML = ""
        dropdownMenuElement.remove()
        dropdownMenuElement = null
    }

    // Create dropdown menu if it doesn't exist
    dropdownMenuElement = document.createElement('div');
    dropdownMenuElement.className = 'dropdown-content';
    dropdownMenuElement.setAttribute('data-dropdown-menu', '');
    dropdownMenuElement.innerHTML = listsHTML;
    thirdParent.appendChild(dropdownMenuElement);

    // Initialize list item click handlers
    const listItems = dropdownMenuElement.querySelectorAll('[list-id]');
    listItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.stopPropagation();
            const listName = this.getAttribute('list-id');
            console.log(`Clicked: ${listName}`);

            let addOrRemove = null
            if (item.classList.contains("selected")) {
                item.classList.remove("selected")
                addOrRemove = "remove"
            } else {
                item.classList.add("selected")
                addOrRemove = "add"
            }

            chrome.runtime.sendMessage({
                memberID: item.getAttribute("member-id"),
                listID: item.getAttribute("list-id"),
                addOrRemove: addOrRemove
            })
        });
    });

    // Toggle dropdown on click
    dropdownBtn.addEventListener('click', function (e) {
        console.log('Dropdown clicked!');
        e.stopPropagation();

        // Calculate position
        const btnRect = dropdownBtn.getBoundingClientRect();
        dropdownMenuElement.style.left = `${btnRect.left}px`;
        dropdownMenuElement.style.top = `${btnRect.bottom + 8}px`;

        dropdownMenuElement.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!dropdownBtn.contains(e.target) && !dropdownMenuElement.contains(e.target)) {
            dropdownMenuElement.classList.remove('show');
        }
    });
}
