// open a nyaa tab to the given nyaa string
export function openNyaa(nyaastring:string):void
{
    chrome.tabs.create({
        active:false,
        url:`https://nyaa.si/?q=${nyaastring}&f=0&c=1_2`
    });
}