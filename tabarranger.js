function contextClick(info, tab)
{   chrome.tabs.query({currentWindow: true}, tabsCallback);
}

function stripURL(url)
{
    // first [] matches domain, second and third attempt to match TLDs
    var matches = url.match(/[-a-z0-9]*\.[a-z]{2,3}\.?[a-z]{0,3}\/.*/i);
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
    sortedTabs = tabs.concat().sort(compareTabs);

    for (var i = 0; i < tabs.length; ++i)
    {   chrome.tabs.move(sortedTabs[i].id,{"index": i});
    }
}

var id = chrome.contextMenus.create({"title": "Arrange tabs", 
                                     "contexts":["all"],
                                     "onclick": contextClick
                                    });