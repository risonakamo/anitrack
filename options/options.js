window.onload=main;

function main()
{    
    chrome.storage.local.get("ids",function(d){
        var ids=d.ids;
        var getIds=Object.keys(ids);

        var dayTables=document.querySelectorAll(".day-table");
        chrome.storage.local.get(getIds,function(d2){
            var html=["","","","","","","",""];
            var o;

            getIds.forEach(function(e){                
                o=d2[e];
                
                if (o.day==null)
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
        nyaa=`href="https://www.nyaa.se/?page=search&cats=1_37&filter=0&term=${nyaa}"`;
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
    var paneDelete=document.querySelector(".delBox");
    var paneTitle=document.querySelector(".pane-title");
    var nyaa=document.querySelector(".nyaaInput");
    var day=document.querySelector(".dayInput");
    
    Nlinks.forEach(function(e){
        e.addEventListener("contextmenu",function(e2){
            e2.preventDefault();

            paneTitle.innerHTML=this.parentElement.parentElement.children[1].children[0].innerHTML;
            paneSubmit.dataset.id=this.dataset.id;
            paneDelete.dataset.id=this.dataset.id;
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

    var deleteFunc=function(e){
        if (e.key && e.key!="Enter")
        {                       
            return;
        }

        delEntry(this.dataset.id);
    };
    
    paneSubmit.addEventListener("click",submitFunc);
    paneSubmit.addEventListener("keydown",submitFunc);
    
    paneCancel.addEventListener("click",cancelFunc);
    paneCancel.addEventListener("keydown",cancelFunc);

    paneDelete.addEventListener("click",deleteFunc);
    paneDelete.addEventListener("keydown",deleteFunc);
}

function updateND(id,nyaa,day)
{
    var dayGet="day"+day;

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
}xs

function displayStorage()
{
    chrome.storage.local.get(null,function(d){
        console.log(d);
    });
}

function delEntry(id)
{
    chrome.storage.local.get([id,"ids"],function(d){
        var day="day"+d[id].day;        
        chrome.storage.local.get(day,function(d2){
            delete d.ids[id];
            delete d2[day][id];

            var o={};
            o.ids=d.ids;
            o[day]=d2[day];

            chrome.storage.local.set(o);
            chrome.storage.local.remove(id);
        });       
    });
}
