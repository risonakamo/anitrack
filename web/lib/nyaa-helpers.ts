// open a nyaa tab to the given nyaa string
export function openNyaa(nyaastring:string,active:boolean=false):void
{
    chrome.tabs.create({
        active,
        // url:createNyaaSearchString(nyaastring),
        url:createAnimeToshoSearchString(nyaastring)
    });
}

/** search url for nyaa */
function createNyaaSearchString(query:string):string
{
    return `https://nyaa.si/?q=${query}&f=0&c=1_2`;
}

/** search url for animetosho */
function createAnimeToshoSearchString(query:string):string
{
    return `https://animetosho.org/search?q=${query}`;
}