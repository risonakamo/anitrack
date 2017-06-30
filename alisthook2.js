window.onload=main;

function main()
{
    chrome.storage.local.get("userOps",(d)=>{
        if (!d.userOps)
        {
            d=["",""];
        }

        else
        {
            d=d.userOps;
        }

        var urlArray=window.location.href.slice(8).split("/");

        if (urlArray.length<3 || (urlArray[2]!=d[0] && urlArray[2]!=d[1]))
        {
            return;
        }

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

    if (watchTable.previousSibling.innerText!="Watching")
    {
        return;
    }

    var entries=watchTable.querySelectorAll("tr");

    var seenIds={};
    Object.assign(seenIds,storageIds);

    for (var x=1,l=entries.length;x<l;x++)
    {
        var res={};
        res.link=entries[x].childNodes[1].firstChild.href;
        res.id=res.link.slice(25);
        res.progress=entries[x].childNodes[3].firstChild.innerText;

        delete seenIds[res.id];

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

    for (var x in seenIds)
    {
        delete storageData[x];
        delete storageIds[x];
    }

    storageData.ids=storageIds;
    console.log(storageData);
    chrome.storage.local.set(storageData);

    if (Object.keys(seenIds).length>0)
    {
        chrome.storage.local.remove(Object.keys(seenIds));
    }
}