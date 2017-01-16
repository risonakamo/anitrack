window.onload=main;

function main()
{
    var oButton=document.querySelector(".options");
    
    oButton.addEventListener("click",function(e){
        chrome.tabs.create({url:"options.html"});
    });
}
