window.onload=main;

function main()
{
    setOverviewButton();

    var dayGet=new Date();
    dayGet=dayGet.getDay()+1;
    dayGet="day"+dayGet;

    chrome.storage.local.get(dayGet,function(d){        
        chrome.storage.local.get(Object.keys(d[dayGet]),function(d2){
            console.log(d2);
        });
    });
}

function setOverviewButton()
{
    var oButton=document.querySelector(".options");
    
    oButton.addEventListener("click",function(e){
        chrome.tabs.create({url:"/options/options.html"});
    });
}
