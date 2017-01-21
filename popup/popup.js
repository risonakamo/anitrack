window.onload=main;

function main()
{
    setOverviewButton();
    displayEntries(".entries",0);
    displayEntries(".entries-2",-1);
}

function setOverviewButton()
{
    var oButton=document.querySelector(".options");
    
    oButton.addEventListener("click",function(e){
        chrome.tabs.create({url:"/options/options.html"});
    });
}

var dayArray=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function displayEntries(entryPoint=".entries",dayOffset=0)
{
    var entriesPoint=document.querySelector(entryPoint);
    var dayGet=new Date();
    dayGet=dayGet.getDay()+dayOffset;
    var dayString=dayArray[dayGet];
    dayGet="day"+(dayGet+1);
    var today="";
    if (dayOffset==0)
    {
        today="today";
    }
    
    chrome.storage.local.get(dayGet,function(d){
        if (!d[dayGet])
        {
            entriesPoint.innerHTML=`<p class="entries-header ${today}">${dayString}</p>`+entriesPoint.innerHTML;
            return;
        }
        
        dayGet=Object.keys(d[dayGet]);
        dayGet.push("ids");
        chrome.storage.local.get(dayGet,function(d2){
            var html=`<p class="entries-header">${dayString}</p>`;

            for (var x in d2)
            {
                if (x=="ids")
                {
                    continue;
                }
                
                html+=genEntry(d2[x].cover,d2[x].title,d2.ids[x],d2[x].nyaa);
            }            

            entriesPoint.innerHTML=html;
            setLinks();
        });
    });    
}

function setLinks()
{
    var links=document.querySelectorAll(".entry-link,.ex-links .plink");

    links.forEach(function(e){
        e.addEventListener("click",function(e2){
            e2.preventDefault();
            chrome.tabs.create({url:this.href,active:false});
        });
    });

    var updateAll=document.querySelector(".update");
    var p=updateAll.children[0];
    var uaFlag=0;

    updateAll.addEventListener("click",function(e){
        if (uaFlag==0)
        {
            uaFlag=1;
            p.classList.add("warning");
            p.innerHTML="sure?";
            return;
        }

        p.innerHTML="executing";
        chrome.tabs.executeScript({file:"/alisthook_full.js"});
    });
}

//nyaa should be in tag form (default form stored in
function genEntry(cover,title,progress,nyaa=0)
{    
    if (!nyaa)
    {
        nyaa="";
    }

    else
    {
        nyaa=`href="https://www.nyaa.se/?page=search&cats=1_37&filter=0&term=${nyaa}"`;
    }
    
    return `<a class="entry-link" ${nyaa}>
  <div class="entry">
    <div class="small-box cover-img">
      <img src="${cover}">
    </div>

    <div class="title">
      <p>${title}</p>
    </div>

    <div class="small-box ep">
      <p>${progress}</p>
    </div>
  </div>
</a>`;
}
