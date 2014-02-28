function contextClick(info, tab)
{   chrome.tabs.query({currentWindow: true}, tabsCallback);
}

function stripURL(url)
{
    // 1 attempts to match domain; 2 and 3 attempt to match TLD
    //                           1        2         3
    var matches = url.match(/[-a-z0-9]*\.\w{2,3}\.?\w{0,3}\/.*/i);
    return matches && matches[0];
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
    tabs.sort(compareTabs);

    for (var i = 0; i < tabs.length; ++i)
    {   chrome.tabs.move(tabs[i].id,{"index": i});
    }
}

var id = chrome.contextMenus.create({"title": "Arrange tabs", 
                                     "contexts":["all"],
                                     "onclick": contextClick
                                    });