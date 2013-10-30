"use strict";
var data = {$type: "data", downloads: []},
    anchors = document.getElementsByTagName("a"),
    i;


/* find all downloads
*/
for(i = 0; i < anchors.length; i += 1) {
  if (anchors[i].download && anchors[i].href) {
      data.downloads.push({filename: anchors[i].download, href: anchors[i].href});
  }
}



/* unsolicited send data to extension
*/
console.log("unsolicited send (from content): " + JSON.stringify(data, null, 4));
chrome.runtime.sendMessage(data);



/* solicited send data to extension
*/
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("received msg (in content):" + JSON.stringify(request, null, 4));
    if (request.$type === "query") {
        console.log("solicited send (from content): " + JSON.stringify(data, null, 4));
        sendResponse(data);
    }
});



