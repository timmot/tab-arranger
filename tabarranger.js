(function () {
    var stripURL = function (url) {
	// attempts to match domain and then any TLD
	var matches = url.match(/[-a-z0-9]*\.\w{2,3}\.?\w{0,3}\/.*/i);
	return matches && matches[0];
    };

    var compareTabs = function (a,b) {
	var fst = stripURL(a.url);
	var snd = stripURL(b.url);

	return (fst > snd) ? 1 : ((fst < snd) ? -1 : 0);
    };

    var tabsCallback = function (tabs) {
	tabs.sort(compareTabs);

	for (var i = 0; i < tabs.length; ++i)
            chrome.tabs.move(tabs[i].id,{"index": i});
    };

    var contextCallback = function (info, tab) {
	chrome.tabs.query({currentWindow: true}, tabsCallback);
    };

    chrome.contextMenus.create({"title": "Arrange tabs", 
				"contexts":["all"],
				"onclick": contextCallback
                               });
})();
