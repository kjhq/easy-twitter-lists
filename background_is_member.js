async function isMember(memberID) {
    const headers = new Headers();
    headers.append("authorization", capturedData["authorization"]);
    headers.append("x-csrf-token", capturedData["x-csrf-token"]);

    const requestOptions = {
        method: "GET",
        headers: headers,
        credentials: "include"
    };

    try {
        const response = await fetch(`https://x.com/i/api/1.1/lists/memberships.json?include_blocking=1&skip_status=1&tweet_mode=extended&include_ext_views=true&cursor=-1&user_id=${memberID}&count=1000&filter_to_owned_lists=true`, requestOptions);
        const result = await response.json();

        let memberInLists = []

        result["lists"].forEach(list => {
            memberInLists.push(list.name)
        });

        console.log(memberInLists)
        return memberInLists

    } catch (error) {
        console.error(error);
    };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message.memberID) {
        return false;
    }

    // Handle the async response
    isMember(message.memberID).then(members => {
        sendResponse(members);
    }).catch(error => {
        console.error('Error getting member info:', error);
        sendResponse([]);
    });

    // Return true to indicate we will send a response asynchronously
    return true;
})