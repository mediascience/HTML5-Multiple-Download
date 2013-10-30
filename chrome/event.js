chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("receive (in event): " + JSON.stringify(request, null, 4));
    if ( request.$type === "data" && request.downloads.length > 1) {
        console.log("count: " + request.downloads.length);
        chrome.pageAction.show(sender.tab.id);
        console.log("is a multi-download page");
        return sendResponse();
    } else {
        console.log("is not a multi-download page");
    }
});



chrome.pageAction.onClicked.addListener(function (tab) {
    var qry = {$type: "query"};
    console.log("sending query (from event): ", JSON.stringify(qry,null,4));
    chrome.tabs.sendMessage(tab.id, qry, function (response) {
        console.log("received data (in event): " + JSON.stringify(response,null,4));
        response.downloads.forEach(function (it) {
           console.log("schedule download: " +  it.filename);
           chrome.downloads.download({url: it.href, filename: it.filename});
        });
    });
});




