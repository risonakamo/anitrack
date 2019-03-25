var _storageids;

document.head.insertAdjacentHTML("beforeend",`<link rel="stylesheet" href="${chrome.runtime.getURL("contentscripts/hooked.css")}">`);

runHook();
attachButtons();

function runHook()
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

                setTimeout(()=>{
                    hook(data,d);
                },500);
            });
        });
    });
}

//storage data: object with ids of shows in storage
//storageIds: object of ids in storage data, with progress count
function hook(storageData,storageIds)
{
    var watchTable=document.querySelector(".list-section");

    if (!watchTable)
    {
        setTimeout(()=>{hook(storageData,storageIds)},200);
        return;
    }

    if (watchTable.previousElementSibling.innerText!="Watching")
    {
        return;
    }

    var entries=watchTable.querySelectorAll(".entry");

    var dayClassAdd;
    var today=new Date().getDay()+1;
    var yesterday=today-1;

    if (yesterday<=0)
    {
        yesterday=7;
    }

    var id;
    for (var x=0,l=entries.length;x<l;x++)
    {
        id=entries[x].children[1].firstChild.href.replace(/.*\/(\d+)\/.*/,"$1");

        //if hooked entry exists in storage
        if (storageData[id])
        {
            if (storageData[id].day)
            {
                // entries[x].classList.add("day");
                dayClassAdd=getDayClass(storageData[id].day);

                if (dayClassAdd!=-1)
                {
                    entries[x].classList.add("day",dayClassAdd);

                    if (storageData[id].day==today || storageData[id].day==yesterday)
                    {
                        entries[x].classList.add("kyou");
                    }
                }
            }
        }

        attachPlusUpdate(entries[x].querySelector(".progress"),storageData[id]);
    }

    updateFromAPI(storageData,storageIds);
}

//do the popup given int number of entries hooked to show in message
function completeMessage(entryCount)
{
    var entry;

    if (entryCount==1)
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

//attach logic to increment single shows progress each click on + sign
function attachPlusUpdate(progressElement,entrydata)
{
    if (!progressElement.firstElementChild)
    {
        return;
    }

    progressElement.firstElementChild.addEventListener("click",(e)=>{
        setTimeout(()=>{
            if (entrydata.progress)
            {
                entrydata.progress++;
            }

            else
            {
                entrydata.progress=1;
            }

            _storageids[entrydata.id]++;

            var storageupdate={ids:_storageids};
            storageupdate[entrydata.id]=entrydata;
            chrome.storage.local.set(storageupdate);

            completeMessage(1);
        },200);
    });
}

//run hook on press of certain links (show user's anime list links)
function attachButtons()
{
    var navtop=document.querySelector("#nav .links");
    var navbot=document.querySelector(".nav.container");

    if (!(navtop && navbot))
    {
        setTimeout(()=>{
            attachButtons();
        },200);
        return;
    }

    navtop.children[2].addEventListener("click",(e)=>{
        runHook();
    });

    navbot.children[1].addEventListener("click",(e)=>{
        runHook();
    });
}

//callback is data usable by seasonYearFilter()
function alistReq(query,callback)
{
    var r=new XMLHttpRequest();
    r.open("POST","https://graphql.anilist.co");

    r.onreadystatechange=()=>{
        if (r.readyState==4)
        {
            callback(JSON.parse(r.response));
        }
    }

    r.setRequestHeader("content-type","application/json");
    r.send(JSON.stringify({query:query}));
}

//update the database using the API. give it the current databased entries with id keys,
//and and an object with the ids and the progress.
function updateFromAPI(storageData,storageIds)
{
    alistReq(`{MediaListCollection(userName:"risona",type:ANIME){lists{name,entries{media{title{romaji},coverImage{large},id,siteUrl},progress}}}}`,
    (data)=>{
        data=data.data.MediaListCollection.lists;

        for (var x=0,l=data.length;x<l;x++)
        {
            if (data[x].name=="Watching")
            {
                data=data[x].entries;
                break;
            }
        }

        //keep track of every id that was present in the database but
        //not in the API. by the end, whatever is left in here should be
        //removed as it was not in the API
        var seenIds=new Set(Object.keys(storageIds));

        var currentId;
        //go over all ids found from api
        for (var x=0,l=data.length;x<l;x++)
        {
            currentId=data[x].media.id;

            //only update progress and cover image if already in storage,
            //to avoid problems possibly happening. cover image updates
            //because anilist has a tendancy to change it
            if (storageData[currentId])
            {
                storageData[currentId].cover=data[x].media.coverImage.large;
                storageData[currentId].progress=data[x].progress;
                seenIds.delete(`${currentId}`);
            }

            else
            {
                storageData[currentId]={
                    cover:data[x].media.coverImage.large,
                    progress:data[x].progress,
                    id:currentId,
                    link:data[x].media.siteUrl,
                    title:data[x].media.title.romaji
                };
            }

            storageIds[currentId]=data[x].progress;
        }

        //get days that need to be retrieved to update
        var deleteDays=new Set();
        //save the entries that will be deleted
        var entriesToBeDeleted={};

        //for every id that is going to be deleted
        for (var x of seenIds)
        {
            //if the entry has a day, put it into deletedays,
            //so it can be removed from that day
            if (storageData[x].day)
            {
                deleteDays.add(storageData[x].day);
            }

            //save the entry
            entriesToBeDeleted[x]=storageData[x];

            //remove it from storagedata so it isnt update
            delete storageData[x];
            //remove the id from the storage
            chrome.storage.local.remove(x);
            //remove it from storage ids
            delete storageIds[x];
        }

        //append word "day" to the day numbers collected
        deleteDays=[...deleteDays];
        for (var x=0,l=deleteDays.length;x<l;x++)
        {
            deleteDays[x]=`day${deleteDays[x]}`;
        }

        //for all the ids that are to be deleted, look at their day, and remove
        //the id from that day array.  then push the day arrays back
        chrome.storage.local.get(deleteDays,(data)=>{
            for (var x of seenIds)
            {
                delete data["day"+entriesToBeDeleted[x].day][x];
            }

            chrome.storage.local.set(data);
        });

        //update the storage ids and storage
        _storageids=storageIds;
        chrome.storage.local.set(storageData);
        chrome.storage.local.set({ids:storageIds});
        completeMessage(data.length);
    });
}