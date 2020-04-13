window.onload=main;

function main()
{
    setOverviewButton();
    displayEntries2();
    // displayEntries(".entries",0,0);
    // displayEntries(".entries-2",-1,1);
}

function setOverviewButton()
{
    var oButton=document.querySelector(".options");

    oButton.addEventListener("click",function(e){
        chrome.tabs.create({url:"/options2/options2.html"});
    });
}

var dayArray=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function displayEntries2()
{
    var entriesPoint=document.querySelectorAll(".entries,.entries-2");
    var days=new Date();
    days=days.getDay();
    days=[days,days-1];

    if (days[1]==-1)
    {
        days[1]=6;
    }

    var dayStrings=["day"+(days[0]+1),"day"+(days[1]+1)];

    chrome.storage.local.get(["ids",dayStrings[0],dayStrings[1]],function(d){
        var ids=d["ids"];
        var dayEps=[d[dayStrings[0]],d[dayStrings[1]]];

        for (var x=0;x<dayEps.length;x++)
        {
            if (!dayEps[x])
            {
                dayEps[x]=[];
            }

            else
            {
                dayEps[x]=Object.keys(dayEps[x]);
            }
        }

        chrome.storage.local.get(dayEps[0].concat(dayEps[1]),function(d2){
            for (var n=0;n<entriesPoint.length;n++)
            {
                var html=`<p class="entries-header">${dayArray[days[n]]}</p>`;

                if (dayEps[n].length==0)
                {
                    entriesPoint[n].innerHTML=html+entriesPoint[n].innerHTML;
                    continue;
                }

                var cid;
                var e;
                for (var x=0;x<dayEps[n].length;x++)
                {
                    cid=dayEps[n][x];
                    e=d2[cid];

                    if (e)
                    {
                        html+=genEntry(e.cover,e.title,ids[cid],e.nyaa);
                    }
                }

                entriesPoint[n].innerHTML=html;
            }

            setLinks();
        });
    });
}

function displayEntries(entryPoint=".entries",dayOffset=0,esetLinks=1)
{
    var entriesPoint=document.querySelector(entryPoint);
    var dayGet=new Date();
    dayGet=dayGet.getDay()+dayOffset;

    if (dayGet==-1)
    {
        dayGet=6;
    }

    var dayString=dayArray[dayGet];
    dayGet="day"+(dayGet+1);

    chrome.storage.local.get(dayGet,function(d){
        if (!d[dayGet])
        {
            entriesPoint.innerHTML=`<p class="entries-header">${dayString}</p>`+entriesPoint.innerHTML;

            if (esetLinks==1)
            {
                setLinks();
            }

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

            if (esetLinks==1)
            {
                setLinks();
            }
        });
    });
}

function setLinks()
{
    var links=document.querySelectorAll(".entry-link,.ex-links .plink");
    var alistLink=document.querySelector(".alist-link");

    chrome.storage.local.get("userOps",(d)=>{
        if (!d.userOps)
        {
            d.userOps=["",""];
        }

        alistLink.href=`http://anilist.co/user/${d.userOps[0]}/animelist`;
    });

    for (var x=0,l=links.length;x<l;x++)
    {
        if (links[x].href)
        {
            links[x].addEventListener("click",(e)=>{
                e.preventDefault();
                chrome.tabs.create({url:e.currentTarget.href,active:false});
            });

            links[x].addEventListener("auxclick",(e)=>{
                e.preventDefault();
                chrome.tabs.create({url:e.currentTarget.href,active:true});
            });
        }

        else
        {
            links[x].classList.add("no-link");
        }
    }
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
        // nyaa=`href="https://www.nyaa.se/?page=search&cats=1_37&filter=0&term=${nyaa}"`;
        nyaa=`href="https://nyaa.si/?q=${nyaa}&f=0&c=1_2"`;
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
