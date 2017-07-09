window.onload=main;

var _storageData;

function main()
{
    setupUserOps();

    chrome.storage.local.get("ids",function(d){
        if (!d)
        {
            return;
        }

        var ids=d.ids;
        var getIds=Object.keys(ids);

        var dayTables=document.querySelectorAll(".day-table");
        chrome.storage.local.get(getIds,function(d2){
            _storageData=d2;
            console.log(_storageData);
            var html=["","","","","","","",""];
            var o;

            getIds.forEach(function(e){
                o=d2[e];

                if (o.day==null || o.day=="")
                {
                    o.day=0;
                }

                html[o.day]+=genEntry(o.cover,o.title,o.link,ids[e],e,o.nyaa);
            });

            var t=new Date();
            t=t.getDay()+1;

            //daytable system not done
            dayTables.forEach(function(e,x){
                if (x==0 && html[x]=="")
                {
                    e.parentElement.classList.add("hidden");
                    return;
                }

                if (x==t.toString())
                {
                    e.parentElement.children[0].classList.add("today");
                }

                if (html[x]=="")
                {
                    e.innerHTML=`<p>no episodes</p>`;
                    return;
                }

                if (html[x]!="")
                {
                    e.innerHTML=html[x];
                }
            });

            setNLinks();
            // displayStorage();
        });
    });
}

function genEntry(cover,title,alistLink,progress,id,nyaa=0)
{
    var ntext="n";
    if (!nyaa)
    {
        nyaa="";
        ntext="x";
    }

    else
    {
        // nyaa=`href="https://www.nyaa.se/?page=search&cats=1_37&filter=0&term=${nyaa}"`;
        nyaa=`href="https://nyaa.si/?q=${nyaa}&f=0&c=1_2"`;
    }

    return `<tr>
  <td class="cover"><img src="${cover}"></td>
  <td class="title"><a href="${alistLink}">${title}</a></td>
  <td class="ep button">${progress}</td>
  <td class="nyaa button"><a ${nyaa} data-id="${id}">${ntext}</a></td>
</tr>`;
}

function setNLinks()
{
    var Nlinks=document.querySelectorAll(".nyaa a");
    var sidePane=document.querySelector(".pane");
    var paneSubmit=document.querySelector(".submitBox");
    var paneCancel=document.querySelector(".cancelBox");
    var paneTitle=document.querySelector(".pane-title");
    var nyaa=document.querySelector(".nyaaInput");
    var day=document.querySelector(".dayInput");

    Nlinks.forEach(function(e){
        e.addEventListener("contextmenu",function(e2){
            e2.preventDefault();

            paneTitle.innerHTML=_storageData[this.dataset.id].title;

            if (_storageData[this.dataset.id].nyaa)
            {
                nyaa.value=_storageData[this.dataset.id].nyaa;
            }

            if (_storageData[this.dataset.id].day)
            {
                day.value=_storageData[this.dataset.id].day;
            }

            paneSubmit.dataset.id=this.dataset.id;
            sidePane.classList.remove("hidden");
            nyaa.focus();
        });
    });

    var submitFunc=function(e){
        if (e.key && e.key!="Enter")
        {
            return;
        }

        updateND(this.dataset.id,nyaa.value,day.value);
        nyaa.value="";
        day.value=0;
        sidePane.classList.add("hidden");
    };

    var cancelFunc=function(e){
        if (e.key && e.key!="Enter")
        {
            return;
        }

        nyaa.value="";
        day.value=0;
        sidePane.classList.add("hidden");
    };

    paneSubmit.addEventListener("click",submitFunc);
    paneSubmit.addEventListener("keydown",submitFunc);

    paneCancel.addEventListener("click",cancelFunc);
    paneCancel.addEventListener("keydown",cancelFunc);

    nyaa.addEventListener("keypress",(e)=>{
        if (e.key=="Enter")
        {
            e.preventDefault();
            updateND(paneSubmit.dataset.id,nyaa.value,day.value);
            nyaa.value="";
            day.value=0;
            sidePane.classList.add("hidden");
        }
    })
}

function updateND(id,nyaa,day)
{
    var dayGet="day"+day;

    _storageData[id].nyaa=nyaa;
    _storageData[id].day=day;

    chrome.storage.local.get([id,dayGet],function(d){
        var entry=d[id];
        var dayArray=d[dayGet];

        if (!dayArray)
        {
            dayArray={};
        }

        dayArray[id]="";

        entry.nyaa=nyaa;
        entry.day=day;

        var setEntry={};
        setEntry[id]=entry;
        setEntry[dayGet]=dayArray;
        chrome.storage.local.set(setEntry);
    });
}

function displayStorage()
{
    chrome.storage.local.get(null,function(d){
        console.log(d);
    });
}

function clearStorage()
{
    chrome.storage.local.clear();
}

function setupUserOps()
{
    var setButton=document.querySelector(".set-button");
    var opsInput=document.querySelectorAll(".user-options .textbox");

    chrome.storage.local.get("userOps",(d)=>{
        if (!d.userOps)
        {
            d.userOps=["",""];
        }

        opsInput[0].value=d.userOps[0];
        opsInput[1].value=d.userOps[1];
    });

    setButton.addEventListener("click",(e)=>{
        var newops=[];

        newops.push(opsInput[0].value);
        newops.push(opsInput[1].value);

        chrome.storage.local.set({userOps:newops});
    });
}