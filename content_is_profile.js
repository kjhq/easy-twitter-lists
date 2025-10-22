class OptimizedButtonObserver {
    constructor(attributeName, attributeValue, callback) {
        this.attrName = attributeName;
        this.attrValue = attributeValue;
        this.callback = callback;
        this.observer = null;
        this.found = new WeakSet();
    }

    matches(el) {
        return el.nodeName === 'BUTTON' &&
            el.getAttribute(this.attrName) === this.attrValue;
    }

    checkElement(el) {
        if (this.found.has(el)) return;

        if (this.matches(el)) {
            this.found.add(el);
            this.callback(el);
        }
    }

    handleMutations(mutations) {
        const toCheck = new Set();

        for (const m of mutations) {
            if (m.type === 'attributes' && m.target.nodeName === 'BUTTON') {
                toCheck.add(m.target);
                continue;
            }

            if (m.addedNodes.length) {
                for (const node of m.addedNodes) {
                    if (node.nodeType !== 1) continue;

                    if (node.nodeName === 'BUTTON') {
                        toCheck.add(node);
                    } else {
                        const btns = node.querySelectorAll?.('button');
                        if (btns) {
                            for (const btn of btns) toCheck.add(btn);
                        }
                    }
                }
            }
        }

        for (const el of toCheck) {
            this.checkElement(el);
        }
    }

    start() {
        const existing = document.querySelectorAll('button');
        for (const btn of existing) {
            this.checkElement(btn);
        }

        this.observer = new MutationObserver((mutations) => {
            this.handleMutations(mutations);
        });

        this.observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: [this.attrName],
            attributeOldValue: false
        });
    }

    stop() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }
}

// Usage Example
const observer = new OptimizedButtonObserver(
    'data-testid',
    'userActions',
    (button) => {
        addListsTab()
    }
);

observer.start();