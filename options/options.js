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

            //daytable system not done
            dayTables.forEach(function(e,x){
                if (html[x]!="")
                {
                    e.innerHTML=html[x];

                    var t=new Date();
                    t=t.getDay()+1;
                    if (x==t.toString())
                    {
                        e.parentElement.children[0].classList.add("today");
                    }
                    
                    e.parentElement.classList.remove("hidden");
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
    var paneTitle=document.querySelector(".pane-title");
    var nyaa=document.querySelector(".nyaaInput");
    var day=document.querySelector(".dayInput");
    
    Nlinks.forEach(function(e){
        e.addEventListener("contextmenu",function(e2){
            e2.preventDefault();

            paneTitle.innerHTML=this.parentElement.parentElement.children[1].children[0].innerHTML;
            paneSubmit.dataset.id=this.dataset.id;
            sidePane.classList.remove("hidden");
        });
    });
    
    paneSubmit.addEventListener("click",function(e){
        updateND(this.dataset.id,nyaa.value,day.value);
        nyaa.value="";
        day.value=0;
        sidePane.classList.add("hidden");
    });
    
    paneCancel.addEventListener("click",function(e){
        nyaa.value="";
        day.value=0;
        sidePane.classList.add("hidden");        
    });
}

function updateND(id,nyaa,day)
{
    var dayGet="day"+day;
    console.log(dayGet);
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
