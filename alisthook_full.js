function main()
{
    chrome.storage.local.get("userOps",(d)=>{
        if (!d.userOps)
        {
            d.userOps=["",""];
        }

        if (window.location!=`https://anilist.co/user/${d.userOps[0]}/animelist/watching` || 
            window.location!=`https://anilist.co/user/${d.userOps[1]}/animelist/watching`)
        {
            console.log("full updating");
            fullUpdateStorage();
        }
    });

    // if (window.location.href!="https://anilist.co/user/Risona/animelist/watching" && window.location.href!="https://anilist.co/user/1836/animelist/watching")
    // {
    //     console.log("incorrect url, pls navigate to http://anilist.co/user/Risona/animelist/watching");
    //     return;
    // }    
}

/*returns object {
 title
 link
 id
 cover
 progress}*/
function runHook()
{
    var imgs=getImgs();
    var info=getTitles();
    var progress=getProgress();

    var d=[];
    
    for (var x=0;x<imgs.length;x++)
    {
        var n={cover:imgs[x],
           title:info[0][x],
           link:info[1][x],
           id:info[2][x],
           progress:progress[x]};

        d.push(n);
    }

    return d;
}

function getImgs()
{
    var imgs=[];
    var covers=document.querySelectorAll(".cover");
    var link;
    
    covers.forEach(function(e){
        link=e.style["background-image"];
        link=`https://cdn.anilist.co/img/dir/anime/reg/${link.slice(46,-2)}`;
        imgs.push(link);
    });

    return imgs;
}

//gets titles,link,and id
function getTitles()
{
    var titles=document.querySelectorAll(".title a");
    var ta=[];
    var tl=[];
    var tid=[];
    var link;
    
    titles.forEach(function(e){
        ta.push(e.innerHTML);

        link=e.href;
        tl.push(link);
        tid.push(link.slice(24))
    });

    return [ta,tl,tid];
}

function getProgress()
{
    var p=[];
    var progresses=document.querySelectorAll(".progress>span:nth-of-type(1)");

    progresses.forEach(function(e){
        p.push(e.innerHTML);
    });

    return p;
}

function printStorageKeys()
{
    chrome.storage.local.get(null,function(d){
        console.log(Object.keys(d));
    });
}

function clearStorage()
{
    chrome.storage.local.clear();
}

//data should be from runhook (array of objects)
function fullUpdateStorage()
{
    data=runHook();
    chrome.storage.local.get("ids",function(d){
        //ids already being tracked
        var ids=d.ids;
        
        if (!ids)
        {
            ids={};
        }

        //data to be added to tracklist
        var setData={};
        data.forEach(function(e){
            //only add to tracklist if confirmed to
            //not already exist in ids list
            if (!ids[e.id])
            {
                setData[e.id]=e;
                ids[e.id]=e.progress;
                console.log(`adding ${e.id}`);
            }
        });

        setData.ids=ids;

        chrome.storage.local.set(setData);
    });
}

main();
