function contextClick(info, tab)
{   chrome.tabs.query({currentWindow: true}, tabsCallback);
}

function stripURL(url)
{
    var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);

    var parts = matches[1].split(".");
    matches[1] = parts[parts.length-2];

    return matches[1];
}

function compareTabs(a,b)
{
    aurl = stripURL(a.url);
    burl = stripURL(b.url);

    if (aurl < burl)
        return -1;
    if (aurl > burl)
        return 1;
    return 0;
}

function tabsCallback(tabs)
{
    sortedTabs = tabs.concat().sort(compareTabs);

    for (var i = 0; i < tabs.length; ++i)
        chrome.tabs.move(sortedTabs[i].id,{"index": i});
}

var id = chrome.contextMenus.create({"title": "Arrange tabs", 
                                     "contexts":["all"],
                                     "onclick": contextClick
                                    });