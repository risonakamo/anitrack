function main()
{
    document.head.insertAdjacentHTML("beforeend",`<link rel="stylesheet" href="${chrome.runtime.getURL("contentscripts/hooked.css")}">`);
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

        if (urlArray.length<3 || (urlArray[2].toLowerCase()!=d[0].toLowerCase() && urlArray[2].toLowerCase()!=d[1].toLowerCase()))
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
    var watchTable=document.querySelector(".list-section");

    if (!watchTable)
    {
        setTimeout(()=>{hook(storageData,storageIds)},100);
        return;
    }

    if (watchTable.previousElementSibling.innerText!="Watching")
    {
        return;
    }

    var entries=watchTable.querySelectorAll(".entry");
    console.log(entries);

    var seenIds={};
    Object.assign(seenIds,storageIds);

    var dayClassAdd;
    var today=new Date().getDay()+1;
    var yesterday=today-1;

    if (yesterday<=0)
    {
        yesterday=7;
    }

    for (var x=0,l=entries.length;x<l;x++)
    {
        var res={};
        res.link=entries[x].children[1].firstChild.href;
        res.id=res.link.replace(/.*\/(\d+)\/.*/,"$1");
        res.progress=entries[x].children[3].innerText.replace(/(\d+)\/.*/,"$1");

        delete seenIds[res.id];

        //if hooked entry exists in storage
        if (storageData[res.id])
        {
            storageData[res.id].progress=res.progress;
            storageIds[res.id]=res.progress;

            if (storageData[res.id].day)
            {
                // entries[x].classList.add("day");
                dayClassAdd=getDayClass(storageData[res.id].day);

                if (dayClassAdd!=-1)
                {
                    entries[x].classList.add("day",dayClassAdd);

                    if (storageData[res.id].day==today || storageData[res.id].day==yesterday)
                    {
                        entries[x].classList.add("kyou");
                    }
                }
            }
        }

        //if it does not, add it
        else
        {
            res.title=entries[x].children[1].firstChild.innerText;
            res.cover=entries[x].firstChild.children[1].style.backgroundImage.replace(/url\("(.+)"\)/,"$1");
            storageData[res.id]=res;
            storageIds[res.id]=res.progress;
        }
    }

    var dayDelete={};
    var dayString;
    for (var x in seenIds)
    {
        if (!dayDelete["day"+storageData[x].day])
        {
            if (!storageData[x].day)
            {
                dayString="";
            }

            else
            {
                dayString=storageData[x].day;
            }

            dayDelete["day"+dayString]=[];
        }

        if (dayDelete["day"+storageData[x].day])
        {
            dayDelete["day"+storageData[x].day].push(x);
        }

        delete storageData[x];
        delete storageIds[x];
    }

    dayUpdate(dayDelete);

    storageData.ids=storageIds;
    chrome.storage.local.set(storageData);

    if (Object.keys(seenIds).length>0)
    {
        chrome.storage.local.remove(Object.keys(seenIds));
    }

    completeMessage(entries.length);
}

function completeMessage(entryCount)
{
    var entry;

    if (entry==1)
    {
        entry="entry";
    }

    else
    {
        entry="entries";
    }

    var msg=document.createElement("div");

    msg.classList.add("hook-message");
    msg.innerHTML=`anitrack: updated ${entryCount} ${entry}`;

    document.body.appendChild(msg);

    msg.classList.add("hook-message-show");
}

//requires object with keys as day string ("day1")
//and values as arrays of ids to be removed
function dayUpdate(update)
{
    if (!Object.keys(update))
    {
        return;
    }

    chrome.storage.local.get(Object.keys(update),(data)=>{
        for (var x in update)
        {
            for (var y=0;y<update[x].length;y++)
            {
                delete data[x][update[x][y]];
            }
        }

        chrome.storage.local.set(data);
    });
}

function getDayClass(day)
{
    switch (day)
    {
        case "1":
        return "nic";

        case "2":
        return "get";

        case "3":
        return "ka";

        case "4":
        return "mizu";

        case "5":
        return "moku";

        case "6":
        return "kin";

        case "7":
        return "do";

        default:
        return -1;
    }
}

main();