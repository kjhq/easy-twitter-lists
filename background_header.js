let capturedData = {
    "authorization": null,
    "x-csrf-token": null,
    "twid": null
}
let dataChanged = false


function getTwid() {
    chrome.cookies.get(
        {
            url: "https://x.com",
            name: "twid"
        },
        (cookie) => {
            if (cookie) {
                capturedData["twid"] = cookie.value
            }
        }
    )
}

function captureHeaders(details) {
    headers = details.requestHeaders
    headers.forEach(header => {
        if (!["authorization", "x-csrf-token"].includes(header.name)) {
            return
        }

        if (capturedData[header.name] != header.value) {
            capturedData[header.name] = header.value
            dataChanged = true

            // Reset lists as the user might have changed
            lists = {}
        }
        getTwid()
    });

    if (dataChanged && capturedData["authorization"] && capturedData["x-csrf-token"]) {
        dataChanged = false
        captureLists()
    }
}


chrome.webRequest.onSendHeaders.addListener(
    captureHeaders,
    { urls: ["*://x.com/*"] },
    ["requestHeaders"]
)
