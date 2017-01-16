window.onload=main;

function main()
{
    chrome.storage.local.get("ids",function(d){
        var ids=d.ids;
        var getIds=Object.keys(ids);

        var dayTables=document.querySelectorAll(".day-table");
        chrome.storage.local.get(getIds,function(d2){
            var html="";
            var o;
            
            getIds.forEach(function(e){
                o=d2[e];
                html+=genEntry(o.cover,o.title,o.link,ids[e],o.nyaa);
            });

            if (o.day==null)
            {
                o.day=0;
            }

            //daytable system not done
            dayTables[0].innerHTML=html;
            dayTables[0].parentElement.classList.remove("hidden");
        });
        
    });
}

function genEntry(cover,title,alistLink,progress,nyaa=0)
{
    if (!nyaa)
    {
        nyaa="";
    }

    else
    {
        nyaa=`href="https://www.nyaa.se/?page=search&cats=1_37&filter=0&term=${nyaa}"`;
    }
    
    return `<tr>
  <td class="cover"><img src="${cover}"></td>
  <td class="title"><a href="${alistLink}">${title}</a></td>
  <td class="ep button">${progress}</td>
  <td class="nyaa button"><a ${nyaa}>n</a></td>
</tr>`;
}
