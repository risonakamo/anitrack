window.onload=main;

function main()
{
    chrome.storage.local.get("ids",(d)=>{
        if (!d.ids)
        {
            d={};
        }

        else
        {
            d=d.ids;
        }


        chrome.storage.local.get(Object.keys(d),(data)=>{
            if (!data)
            {
                data={};
            }

            hook(data,d);
        });
    });

}

function hook(storageData,storageIds)
{
    var watchTable=document.querySelector(".list");

    if (!watchTable)
    {
        setTimeout(()=>{hook(storageData,storageIds)},100);
        return;
    }

    var entries=watchTable.querySelectorAll("tr");

    var data={};
    var ids={};
    for (var x=1,l=entries.length;x<l;x++)
    {
        var res={};
        res.link=entries[x].childNodes[1].firstChild.href;
        res.id=res.link.slice(25);
        res.progress=entries[x].childNodes[3].firstChild.innerText;

        //if hooked entry exists in storage
        if (storageData[res.id])
        {
            storageData[res.id].progress=res.progress;
            storageIds[res.id]=res.progress;
        }

        //if it does not, add it
        else
        {
            res.title=entries[x].childNodes[1].firstChild.innerText;
            res.cover=`https://cdn.anilist.co/img/dir/anime/reg/${entries[x].firstChild.style["background-image"].slice(46,-2)}`;
            storageData[res.id]=res;
            storageIds[res.id]=res.progress;
        }
    }

    storageData.ids=storageIds;
    console.log(storageData);
    chrome.storage.local.set(storageData);
}