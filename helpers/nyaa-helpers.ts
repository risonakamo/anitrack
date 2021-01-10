// open a nyaa tab to the given nyaa string
export function openNyaa(nyaastring:string,active:boolean=false):void
{
    chrome.tabs.create({
        active,
        url:`https://nyaa.si/?q=${nyaastring}&f=0&c=1_2`
    });
}