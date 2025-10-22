async function addMember(memberID, listID, addOrRemove) {
    const headers = new Headers();
    let url = null
    headers.append("authorization", capturedData["authorization"]);
    headers.append("content-type", "application/json");
    headers.append("x-csrf-token", capturedData["x-csrf-token"]);

    if (addOrRemove == "add") {
        url = "https://x.com/i/api/graphql/fbJc4XYq7m2bA_UBWAj31g/ListAddMember"
    } else {
        url = "https://x.com/i/api/graphql/QK7JkzeJYfmid2ISB3H1Jw/ListRemoveMember"
    }

    const raw = JSON.stringify({
        "variables": {
            "listId": String(listID),
            "userId": String(memberID)
        },
        "features": {
            "payments_enabled": false,
            "profile_label_improvements_pcf_label_in_post_enabled": true,
            "responsive_web_profile_redirect_enabled": false,
            "rweb_tipjar_consumption_enabled": true,
            "verified_phone_label_enabled": true,
            "responsive_web_graphql_skip_user_profile_image_extensions_enabled": false,
            "responsive_web_graphql_timeline_navigation_enabled": true
        }
    });

    const requestOptions = {
        method: "POST",
        headers: headers,
        body: raw,
        redirect: "follow",
        credentials: "include"
    };

    try {
        const response = await fetch(url, requestOptions);
        const result = await response.text();
        console.log(result)
    } catch (error) {
        console.error(error);
    };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message.memberID || !message.listID || !message.addOrRemove) {
        return false;
    }
    addMember(message.memberID, message.listID, message.addOrRemove)
})