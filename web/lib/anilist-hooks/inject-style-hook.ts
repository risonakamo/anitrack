export function injectHookStyles():void
{
    document.head.insertAdjacentHTML("beforeend",
        `<link rel="stylesheet" href="${chrome.runtime.getURL("build-cscripts/style.css")}">`);
}