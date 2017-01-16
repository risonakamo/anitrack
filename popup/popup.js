window.onload=main;

function main()
{
    var oButton=document.querySelector(".options");
    
    oButton.addEventListener("click",function(e){
        chrome.tabs.create({url:"/options/options.html"});
    });

    var bob=document.querySelector(".bob");
    chrome.storage.local.get("alist",function(d){
        bob.innerHTML=d.alist;
    });
}
