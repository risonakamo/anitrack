window.onload=main;

function main()
{
    setOverviewButton();
    displayEntries();
}

function setOverviewButton()
{
    var oButton=document.querySelector(".options");
    
    oButton.addEventListener("click",function(e){
        chrome.tabs.create({url:"/options/options.html"});
    });
}

function displayEntries()
{
    var entriesPoint=document.querySelector(".entries");
    var dayGet=new Date();
    dayGet=dayGet.getDay()+1;
    dayGet="day"+dayGet;
    
    chrome.storage.local.get(dayGet,function(d){
        if (!d[dayGet])
        {
            return;
        }
        
        dayGet=Object.keys(d[dayGet]);        
        chrome.storage.local.get(dayGet,function(d2){
            var html="";
            
            for (var x in d2)
            {
                html+=genEntry(d2[x].cover,d2[x].title,d2[x].progress,d2[x].nyaa);
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
