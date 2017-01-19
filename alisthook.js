window.onload=main;

function main()
{
    // fullUpdateStorage(runHook());
    progressUpdate();
}

//special use for progresshook, variation of gettitles
//but gets ids only
function getIds()
{
    var titles=document.querySelectorAll(".title a");
    var ids=[];

    titles.forEach(function(e){
        ids.push(e.href.slice(24));
    });

    return ids;
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

function progressUpdate()
{
    var id=getIds();
    var progress=getProgress();

    chrome.storage.local.get("ids",function(d){
        var ids=d.ids;

        if (!ids)
        {
            ids={};
        }

        for (var x=0;x<id.length;x++)
        {
            if (ids[id[x]])
            {
                ids[id[x]]=progress[x];
            }

            console.log(`updated ${id[x]}`);
        }

        console.log(ids);
        chrome.storage.local.set({"ids":ids});        
    });
}
